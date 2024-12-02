from app import db, User, Post  # Assuming these are imported from your Flask app
import json
import random
from werkzeug.security import generate_password_hash


def generate_random_post_data():
    """
    Generate random post data based on the given structure.
    """
    base_structure = {
    "0-0": "#fff",
    "0-1": "#fff",
    "0-2": "#fff",
    "0-3": "#fff",
    "0-4": "#fff",
    "0-5": "#fff",
    "0-6": "#fff",
    "0-7": "#000",
    "0-8": "#fff",
    "0-9": "#fff",
    "0-10": "#fff",
    "0-11": "#fff",
    "0-12": "#fff",
    "0-13": "#fff",
    "0-14": "#fff",
    "0-15": "#fff",
    "1-0": "#fff",
    "1-1": "#fff",
    "1-2": "#fff",
    "1-3": "#3357FF",
    "1-4": "#fff",
    "1-5": "#fff",
    "1-6": "#F9A825",
    "1-7": "#F9A825",
    "1-8": "#F9A825",
    "1-9": "#F9A825",
    "1-10": "#F9A825",
    "1-11": "#3357FF",
    "1-12": "#fff",
    "1-13": "#fff",
    "1-14": "#fff",
    "1-15": "#fff",
    "2-0": "#fff",
    "2-1": "#fff",
    "2-2": "#fff",
    "2-3": "#3357FF",
    "2-4": "#fff",
    "2-5": "#F9A825",
    "2-6": "#F9A825",
    "2-7": "#F9A825",
    "2-8": "#F9A825",
    "2-9": "#fff",
    "2-10": "#F9A825",
    "2-11": "#F9A825",
    "2-12": "#3357FF",
    "2-13": "#3357FF",
    "2-14": "#3357FF",
    "2-15": "#fff",
    "3-0": "#fff",
    "3-1": "#F9A825",
    "3-2": "#F9A825",
    "3-3": "#F9A825",
    "3-4": "#F9A825",
    "3-5": "#F9A825",
    "3-6": "#fff",
    "3-7": "#000",
    "3-8": "#F9A825",
    "3-9": "#F9A825",
    "3-10": "#3357FF",
    "3-11": "#F9A825",
    "3-12": "#fff",
    "3-13": "#fff",
    "3-14": "#3357FF",
    "3-15": "#fff",
    "4-0": "#F9A825",
    "4-1": "#F9A825",
    "4-2": "#F9A825",
    "4-3": "#F9A825",
    "4-4": "#fff",
    "4-5": "#fff",
    "4-6": "#000",
    "4-7": "#000",
    "4-8": "#fff",
    "4-9": "#F9A825",
    "4-10": "#fff",
    "4-11": "#F9A825",
    "4-12": "#fff",
    "4-13": "#3357FF",
    "4-14": "#3357FF",
    "4-15": "#fff",
    "5-0": "#F9A825",
    "5-1": "#fff",
    "5-2": "#F9A825",
    "5-3": "#3357FF",
    "5-4": "#fff",
    "5-5": "#FF0000",
    "5-6": "#000",
    "5-7": "#000",
    "5-8": "#fff",
    "5-9": "#F9A825",
    "5-10": "#000",
    "5-11": "#F9A825",
    "5-12": "#3357FF",
    "5-13": "#3357FF",
    "5-14": "#fff",
    "5-15": "#fff",
    "6-0": "#F9A825",
    "6-1": "#F9A825",
    "6-2": "#fff",
    "6-3": "#3357FF",
    "6-4": "#fff",
    "6-5": "#FF0000",
    "6-6": "#FF0000",
    "6-7": "#000",
    "6-8": "#000",
    "6-9": "#F9A825",
    "6-10": "#000",
    "6-11": "#F9A825",
    "6-12": "#3357FF",
    "6-13": "#fff",
    "6-14": "#fff",
    "6-15": "#fff",
    "7-0": "#F9A825",
    "7-1": "#F9A825",
    "7-2": "#fff",
    "7-3": "#3357FF",
    "7-4": "#fff",
    "7-5": "#fff",
    "7-6": "#fff",
    "7-7": "#FF0000",
    "7-8": "#fff",
    "7-9": "#F9A825",
    "7-10": "#3357FF",
    "7-11": "#F9A825",
    "7-12": "#3357FF",
    "7-13": "#fff",
    "7-14": "#fff",
    "7-15": "#fff",
    "8-0": "#fff",
    "8-1": "#F9A825",
    "8-2": "#fff",
    "8-3": "#3357FF",
    "8-4": "#fff",
    "8-5": "#000",
    "8-6": "#000",
    "8-7": "#FF0000",
    "8-8": "#FF0000",
    "8-9": "#FF0000",
    "8-10": "#F9A825",
    "8-11": "#000",
    "8-12": "#3357FF",
    "8-13": "#3357FF",
    "8-14": "#3357FF",
    "8-15": "#fff",
    "9-0": "#fff",
    "9-1": "#F9A825",
    "9-2": "#F9A825",
    "9-3": "#3357FF",
    "9-4": "#000",
    "9-5": "#fff",
    "9-6": "#fff",
    "9-7": "#000",
    "9-8": "#fff",
    "9-9": "#FF0000",
    "9-10": "#FF0000",
    "9-11": "#000",
    "9-12": "#fff",
    "9-13": "#fff",
    "9-14": "#fff",
    "9-15": "#fff",
    "10-0": "#fff",
    "10-1": "#000",
    "10-2": "#F9A825",
    "10-3": "#F9A825",
    "10-4": "#F9A825",
    "10-5": "#F9A825",
    "10-6": "#F9A825",
    "10-7": "#F9A825",
    "10-8": "#F9A825",
    "10-9": "#F9A825",
    "10-10": "#FF0000",
    "10-11": "#3357FF",
    "10-12": "#3357FF",
    "10-13": "#3357FF",
    "10-14": "#3357FF",
    "10-15": "#fff",
    "11-0": "#000",
    "11-1": "#000",
    "11-2": "#F9A825",
    "11-3": "#3357FF",
    "11-4": "#3357FF",
    "11-5": "#3357FF",
    "11-6": "#3357FF",
    "11-7": "#fff",
    "11-8": "#F9A825",
    "11-9": "#F9A825",
    "11-10": "#FF0000",
    "11-11": "#FF0000",
    "11-12": "#fff",
    "11-13": "#fff",
    "11-14": "#fff",
    "11-15": "#fff",
    "12-0": "#fff",
    "12-1": "#fff",
    "12-2": "#fff",
    "12-3": "#F9A825",
    "12-4": "#fff",
    "12-5": "#000",
    "12-6": "#fff",
    "12-7": "#F9A825",
    "12-8": "#F9A825",
    "12-9": "#fff",
    "12-10": "#3357FF",
    "12-11": "#FF0000",
    "12-12": "#FF0000",
    "12-13": "#fff",
    "12-14": "#fff",
    "12-15": "#fff",
    "13-0": "#3357FF",
    "13-1": "#3357FF",
    "13-2": "#fff",
    "13-3": "#fff",
    "13-4": "#000",
    "13-5": "#fff",
    "13-6": "#F9A825",
    "13-7": "#F9A825",
    "13-8": "#fff",
    "13-9": "#3357FF",
    "13-10": "#3357FF",
    "13-11": "#fff",
    "13-12": "#FF0000",
    "13-13": "#FF0000",
    "13-14": "#FF0000",
    "13-15": "#fff",
    "14-0": "#fff",
    "14-1": "#3357FF",
    "14-2": "#000",
    "14-3": "#000",
    "14-4": "#fff",
    "14-5": "#fff",
    "14-6": "#F9A825",
    "14-7": "#F9A825",
    "14-8": "#F9A825",
    "14-9": "#3357FF",
    "14-10": "#fff",
    "14-11": "#fff",
    "14-12": "#fff",
    "14-13": "#fff",
    "14-14": "#fff",
    "14-15": "#fff",
    "15-0": "#fff",
    "15-1": "#3357FF",
    "15-2": "#000",
    "15-3": "#000",
    "15-4": "#fff",
    "15-5": "#fff",
    "15-6": "#F9A825",
    "15-7": "#F9A825",
    "15-8": "#F9A825",
    "15-9": "#3357FF",
    "15-10": "#fff",
    "15-11": "#fff",
    "15-12": "#fff",
    "15-13": "#fff",
    "15-14": "#fff",
    "15-15": "#fff"
    
}
    # Randomly change some values to make each post unique
    keys = list(base_structure.keys())
    for _ in range(random.randint(10, 30)):  # Randomly change 5 to 15 keys
        key = random.choice(keys)
        base_structure[key] = random.choice(["#fff", "#000", "#3357FF", "#F9A825", "#FF0000"])
    
    return base_structure


def populate_users():
    """
    Populate the database with 20 random users including email.
    """
    domains = ["example.com", "mail.com", "test.com", "demo.com"]
    
    for i in range(20):
        username = f"user{i+1}"
        email = f"user{i+1}@{random.choice(domains)}"
        password = generate_password_hash(f"password{i+1}", method='pbkdf2:sha256')
        
        user = User(username=username, email=email, password=password)
        db.session.add(user)
    
    db.session.commit()
    print("Database has been populated with 20 users, including email.")
    
def generate_random_tags():
    """
    Generate a random set of tags for a post.
    """
    all_tags = ["art", "pixel", "creative", "design", "colorful", "fun", "retro", "modern", "minimal", "complex"]
    num_tags = random.randint(1, 5)  # Each post can have 1 to 5 tags
    return ", ".join(random.sample(all_tags, num_tags))  # Join tags as a comma-separated string

def populate_posts():
    """
    Populate the database with 100 posts, each with randomized tags.
    """
    user_ids = [user.id for user in User.query.all()]  # Get all user IDs from the database

    for i in range(100):
        title = f"Post Title {i+1}"
        content = json.dumps(generate_random_post_data())  # Convert structure to JSON
        user_id = random.choice(user_ids)  # Assign a random user ID to the post
        tags = generate_random_tags()  # Randomize the tags

        post = Post(title=title, content=content, user_id=user_id, hashtags=tags)
        db.session.add(post)
    
    db.session.commit()
    print("Database has been populated with 100 posts.")

if __name__ == "__main__":
    from app import app  # Import the Flask app
    with app.app_context():
        db.drop_all()
        db.create_all()
    with app.app_context():  # Ensure the app context is available
        populate_users()
        populate_posts()
