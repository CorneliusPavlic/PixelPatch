from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS  # Import CORS
from sqlalchemy import or_
from sqlalchemy.orm import aliased
from flask import request, jsonify


import json

# Initialize app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Change to MySQL if needed
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['JWT_SECRET_KEY'] = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMjU1NjcxMSwiaWF0IjoxNzMyNTU2NzExfQ.oQqCPZWH0Ukkxz6trD4oajwiT0B0qYO6P7STTjHneT0'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 900  # Access token expires in 15 minutes
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = 2592000  # Refresh token expires in 30 days


db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)


# Database models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)  # Field for storing pixel art data
    hashtags = db.Column(db.String(255), nullable=True)  # Tags for the post
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


# Routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "Missing required fields"}), 400

    # Check if user already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_access_token(identity=user.id, fresh=True)  # Long-lived refresh token
        return jsonify({
            "access_token": access_token,
            "refresh_token": refresh_token
        }), 200

    return jsonify({"message": "Invalid username or password"}), 401


@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({
        "access_token": new_access_token
    }), 200


@app.route('/submitPost', methods=['POST'])
@jwt_required()
def submit_post():
    """
    Endpoint to handle the submission of a new post.
    """
    try:
        # Get the JSON data from the request
        data = request.json
        # Extract fields
        title = data.get('title')
        pixel_art_data = data.get('dataSend')  # Assuming pixel art data is passed as "dataSend"
        hashtags = data.get('hashtags')
        user_id = get_jwt_identity()  # Extract user ID from JWT
        # Validate required fields
        if not title or not pixel_art_data:
            return jsonify({"message": "Title and content are required."}), 400
        # Create a new Post object
        new_post = Post(title=title, content=json.dumps(pixel_art_data), hashtags=hashtags, user_id=user_id)
        # Save the post to the database
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"message": "Post created successfully!"}), 201
    except Exception as e:
        print(f"Error in submit_post: {e}")
        return jsonify({"message": "An error occurred while submitting the post."}), 500


@app.route('/delete_post/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    current_user_id = get_jwt_identity()
    post = Post.query.filter_by(id=post_id, user_id=current_user_id).first()
    if not post:
        return jsonify({"message": "Post not found or not authorized"}), 404
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200


@app.route('/retrieve_posts', methods=['GET'])
def retrieve_posts():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    # Retrieve posts along with the associated user
    posts = db.session.query(Post, User).join(User, User.id == Post.user_id).paginate(page=page, per_page=per_page)
    # Prepare the data to return, including user information
    output = [
        {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "username": user.username,  # Include the user's username
            "user_id": user.id
        }
        for post, user in posts.items
    ]
    return jsonify(output), 200



@app.route('/retrieve_user_posts', methods=['GET'])
@jwt_required()  # Ensure the user is authenticated via JWT
def retrieve_user_posts():
    print("THIS IS WORKING")
    """
    Retrieves the posts for the currently authenticated user.
    """
    try:
        current_user_id = get_jwt_identity()  # Get user ID from JWT
        print(f"Authenticated User ID: {current_user_id}")  # Debugging line

        # Query the database for posts belonging to the current user
        posts = Post.query.filter_by(user_id=current_user_id).all()

        # Format the posts data for response
        output = [{"id": post.id, "title": post.title, "content": post.content} for post in posts]

        return jsonify(output), 200
    except Exception as e:
        print(f"Error in retrieve_user_posts: {str(e)}")
        return jsonify({"message": "An error occurred while retrieving posts."}), 500




@app.route('/search', methods=['GET'])
def search_posts():
    query = request.args.get('query', '').lower().strip()
    if not query:
        return jsonify([]), 200

    results = []

    # Searching for users with usernames similar to the query
    users = User.query.filter(User.username.ilike(f"%{query}%")).all()

    # Searching for posts with title similar to the query or containing hashtags
    posts = Post.query.filter(
        or_(
            Post.title.ilike(f"%{query}%"),  # Matches titles that contain the query
            Post.hashtags.ilike(f"%{query}%")  # Matches hashtags
        )
    ).all()

    # Add users to results
    for user in users:
        results.append({
            "id": None,  # Users don't have a post ID
            "username": user.username,
            "user_id": user.id,
            "title": None,
            "content": None,
        })

    # Add posts to results
    for post in posts:
        results.append({
            "id": post.id,
            "user_id": post.user_id,
            "title": post.title,
            "content": post.content,
            "hashtags": post.hashtags
        })

    return jsonify(results), 200

@app.route('/user_posts/<int:user_id>', methods=['GET'])
def user_posts(user_id):
    """
    Endpoint to retrieve posts of a specific user based on user_id.
    """
    try:
        # Get the user_id from the URL and fetch posts for this user
        posts = Post.query.filter_by(user_id=user_id).all()

        if not posts:
            return jsonify({"message": "No posts found for this user."}), 404

        # Return post details along with the associated user's name
        output = [{"id": post.id, "title": post.title, "content": post.content} for post in posts]

        return jsonify(output), 200
    except Exception as e:
        print(f"Error in user_posts: {e}")
        return jsonify({"message": "An error occurred while fetching the user's posts."}), 500


@app.route('/edit_post/<int:post_id>', methods=['PUT'])
@jwt_required()
def edit_post(post_id):
    current_user_id = get_jwt_identity()
    post = Post.query.filter_by(id=post_id, user_id=current_user_id).first()
    if not post:
        return jsonify({"message": "Post not found or not authorized"}), 404
    
    data = request.json
    post.title = data.get('title', post.title)
    db.session.commit()
    return jsonify({"message": "Post updated"}), 200



# Main function
if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True)
