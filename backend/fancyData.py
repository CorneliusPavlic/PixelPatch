import requests
from PIL import Image
from io import BytesIO
import json
from werkzeug.security import generate_password_hash
from app import db, User, Post
from sqlalchemy.exc import SQLAlchemyError

# List of famous artists
artists = [
    "Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Leonardo da Vinci", 
    "Salvador Dalí", "Michelangelo", "Frida Kahlo", "Andy Warhol", 
    "Jackson Pollock", "Edvard Munch", "Rembrandt", "Henri Matisse", 
    "Marc Chagall", "Paul Cézanne", "Paul Gauguin", "Georgia O'Keeffe", 
    "Wassily Kandinsky", "Gustav Klimt", "Johannes Vermeer", "Edgar Degas", 
    "Roy Lichtenstein", "Damien Hirst", "David Hockney", "Keith Haring", 
    "Robert Rauschenberg", "Yayoi Kusama", "Joseph Beuys", "Anselm Kiefer",
    "Hannah Höch", "Kazimir Malevich", "Jean-Michel Basquiat", "Banksy",
    "Andy Goldsworthy", "Lucian Freud", "Gustave Courbet", "Franz Marc", 
    "Mark Rothko", "Edward Hopper", "Pierre-Auguste Renoir", "Auguste Rodin", 
    "Élisabeth Louise Vigée Le Brun", "Mary Cassatt", "Albrecht Dürer", 
    "Edward Weston", "Francisco Goya", "René Magritte", "Marcelle Cahn", 
    "Hiroshi Sugimoto", "Berthe Morisot", "Amedeo Modigliani", "Willem de Kooning",
    "Antoni Tàpies", "Roy Lichtenstein", "Norman Rockwell", "Lucio Fontana", 
    "John Singer Sargent", "Yves Klein", "Jackson Pollock", "Helen Frankenthaler", 
    "Ellsworth Kelly", "Alfred Stieglitz", "Man Ray", "Jasper Johns", "Annie Leibovitz",
    "Frank Stella", "Jean Dubuffet", "Maurizio Cattelan", "Louise Bourgeois", 
    "Edward Burtynsky", "Henry Moore", "David Smith", "Jean Arp", "Andy Warhol",
    "Jean-Paul Riopelle", "Robert Indiana", "Keith Haring", "Thomas Gainsborough",
    "J.M.W. Turner", "Hans Holbein", "John Constable", "Maurice Utrillo", 
    "Kurt Schwitters", "René Magritte", "Piet Mondrian", "Gerhard Richter", 
    "David Altmejd", "Ai Weiwei", "M.C. Escher", "Chuck Close", "Leonora Carrington", 
    "Jean-Michel Basquiat", "Maurice de Vlaminck", "Paul Klee", "Giorgio de Chirico", 
    "Mikhail Larionov", "Camille Pissarro", "Édouard Manet", "Isamu Noguchi", 
    "Richard Serra", "Eugène Delacroix", "Keith Haring", "Egon Schiele", "Jean Metzinger",
    "Sophie Calle", "Michaelangelo Pistoletto", "Giorgio Morandi", "Manolo Valdés", 
    "Eva Hesse", "Hiroshi Sugimoto", "Ed Ruscha", "Robert Motherwell", "Julian Schnabel",
    "Frank Gehry", "Frank Lloyd Wright", "Max Ernst", "Raoul Dufy", "René Magritte",
    "Richard Prince", "Marc Quinn", "Jean-Michel Basquiat", "Cy Twombly", "David Hockney",
    "Eva Zeisel", "David Salle", "Albert Bierstadt", "John Tenniel", "Larry Rivers", 
    "Keith Sonnier", "Jacqueline de Jong", "Barbara Hepworth", "Gustav Klimt", 
    "Chuck Close", "Jim Dine", "Alexander Calder", "Louise Nevelson", "Helen Levitt", 
    "Richard Diebenkorn", "Bridget Riley", "Earl Cunningham", "Gerald Laing", 
    "Hiroshi Sugimoto", "Claude Lorrain", "Thomas Eakins", "Lucian Freud", "Paul Jenkins",
    "Andy Goldsworthy", "Hans Wegner", "Salvador Dalí", "Artemisia Gentileschi", 
    "Sandro Botticelli", "Raphael", "Diego Rivera", "Tom Wesselmann", "Chris Burden",
    "Niki de Saint Phalle", "Sam Francis", "Jean-Michel Basquiat", "Helen Frankenthaler",
    "Henri Rousseau", "Berthe Morisot", "Max Beckmann", "Jean Arp", "Vasily Kandinsky", 
    "Antoni Gaudí", "Roy Lichtenstein", "Gustav Klimt", "Zao Wou-Ki", "Eva Hesse", 
    "Mark Rothko", "Marina Abramović", "Alberto Giacometti", "Hans Bellmer", 
    "El Anatsui", "Shirin Neshat", "David Hammons", "Anselm Kiefer", "Sigmar Polke",
    "Marlene Dumas", "Ellen Gallagher", "Arturo Herrera", "Chris Ofili", "Sol LeWitt",
    "Julian Opie", "Joseph Kosuth", "George Condo", "Tina Modotti", "James Turrell", 
    "Isabel Rawsthorne", "Eve Sussman", "Isaac Julien", "Glenn Ligon", "Chris Killip",
    "Rene Magritte", "Tom Sachs", "Dan Flavin", "Frank Stella", "Joan Miró", "Robert Rauschenberg"
]


# Artsy API details
ARTSY_API_URL = "https://api.artsy.net/api/artworks"
ARTSY_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiIxN2ZjNTE1MC1mMTM5LTQ3Y2YtOWJlMS1iMDUyYThjY2Y1MTciLCJleHAiOjE3MzM3NzE1MTEsImlhdCI6MTczMzE2NjcxMSwiYXVkIjoiMTdmYzUxNTAtZjEzOS00N2NmLTliZTEtYjA1MmE4Y2NmNTE3IiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjY3NGUwNjc3NmVjYTliM2UyYzBlNWEzYyJ9.G1TvWmhDmedDOAOACEWYVAWsIBcavpUrKdqtsmpqytk"  # Replace with your Artsy Access Token

def fetch_painting_image(artist_name):
    """
    Fetch a painting image for a given artist using the Artsy API.
    """
    headers = {
        "X-Xapp-Token": ARTSY_ACCESS_TOKEN
    }

    # Search for the artist by name
    search_url = f"https://api.artsy.net/api/search?q={artist_name}&type=artist"
    print(f"Requesting URL: {search_url}")  # Print the search URL to check
    response = requests.get(search_url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        # Check if we have results and if the first result is an artist
        if '_embedded' in data and 'results' in data['_embedded']:
            # Get the first artist from the response
            artist = data['_embedded']['results'][0]
            print(artist)
            # Extract the thumbnail image URL
            image_url = artist.get('_links', {}).get('thumbnail', {}).get('href')
            if image_url:
                print(f"Found image for artist {artist_name}: {image_url}")
                return image_url
            else:
                print(f"No image found for the artist {artist_name}.")
        else:
            print(f"No results found for artist: {artist_name}")
    elif response.status_code == 401:
        print(f"Authentication error: Please check your Artsy Access Token.")
        print(f"Response: {response.text}")  # Print the error message for 401
    else:
        print(f"Failed to fetch data for {artist_name}. HTTP Status Code: {response.status_code}")
        print(f"Response: {response.text}")  # Print the error message for other status codes
    
    return None


# Function to convert image to pixel art (16x16 resolution)
def image_to_pixel_art(image_url):
    """
    Convert an image to a 16x16 pixel art representation.
    """
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))

    # Resize image to 16x16 pixels for pixel art effect
    img = img.resize((16, 16), Image.NEAREST)
    
    # Convert the image to RGB if it's not already in that mode
    img = img.convert("RGB")

    # Convert image pixels to a dictionary representing the pixel art
    pixel_art = {}
    for i in range(16):
        for j in range(16):
            r, g, b = img.getpixel((j, i))
            pixel_art[f"{i}-{j}"] = f"#{r:02x}{g:02x}{b:02x}"
    
    return pixel_art

# Function to populate the database with artists and their pixel art
def populate_users_and_posts():
    """
    Populate the database with famous artists as users, and their paintings as pixel art posts.
    """
    for artist in artists:
        # Fetch painting image for the artist
        image_url = fetch_painting_image(artist)
        if not image_url:
            print(f"Could not find an image for {artist}. Skipping.")
            continue

        # Convert the image to pixel art
        pixel_art = image_to_pixel_art(image_url)

        # Create a user for the artist
        username = artist.replace(" ", "").lower()
        email = f"{username}@art.com"
        password = generate_password_hash(f"{username}_password", method='pbkdf2:sha256')
        user = User(username=username, email=email, password=password)

        try:
            # Add user to the session and commit to get user.id
            db.session.add(user)
            db.session.commit()

            # Create a post with the pixel art of the artist's painting
            post_title = f"{artist}'s Artwork"
            post_content = json.dumps(pixel_art)  # Store the pixel art as JSON
            post = Post(title=post_title, content=post_content, user_id=user.id)

            # Add the post to the session and commit
            db.session.add(post)
            db.session.commit()

        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error occurred while adding {artist}'s data: {e}")
            continue

    print("Database has been populated with famous artists and their pixel art posts.")

# Ensure the app context is available
if __name__ == "__main__":
    from app import app  # Import the Flask app
    with app.app_context():
        db.drop_all()  # Drop all tables (for testing, could be omitted in production)
        db.create_all()  # Create tables
        populate_users_and_posts()  # Populate the database
