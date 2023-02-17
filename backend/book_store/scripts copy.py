import json
import requests
from .models import Book, Author


def create_book_from_open_library(key):
    # Construct the Open Library API URL for the book with the given key
    url = f"https://openlibrary.org/{key}.json"

    # Send a GET request to the Open Library API to fetch the book data
    response = requests.get(url)

    # Check if the response was successful
    if response.status_code == 200:
        # Use the json.loads() method to parse the JSON response
        book_data = json.loads(response.text)
        identifier = key
        # Extract the author information from the book data JSON
        author_key = book_data["authors"][0]["author"]["key"]
        # Create Book and Author objects to pass to review
        book = Book    
        print(identifier)
        print(author_key)
    else:
        print(
            f"Failed to fetch book data from Open Library API: {response.status_code}")


if __name__ == '__main__':
    create_book_from_open_library("/works/OL78559W")
