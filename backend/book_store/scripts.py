import requests
from .models import Book, Author


def create_book_from_open_library(key):
    # Construct the Open Library API URL for the book with the given key
    url = f"https://openlibrary.org/books/{key}.json"

    # Send a GET request to the Open Library API to fetch the book data
    response = requests.get(url)
    book_data = response.json()

    # Extract the data we need from the book data JSON
    identifier = key
    title = book_data["title"]
    author_name = book_data["authors"][0]["name"]
    author_identifier = book_data["author"]['key']
    description = book_data.get("description")

    # Check if an Author object already exists for the book's author
    try:
        author = Author.objects.get(name=author_name)
    except Author.DoesNotExist:
        # If no Author object exists, create one
        author = Author.objects.create(name=author_name)

    # Create a Book object using the extracted data
    book = Book.objects.create(
        identifier=identifier,
        title=title,
        author=author,
        description=description,
    )

    # Return the newly created Book object
    return book

def create_book_from_google_books(key):
    # Construct the Google Books API URL for the book with the given key
	url = f"https://www.googleapis.com/books/v1/volumes/{key}"

	# Send a GET request to the Google Books API to fetch the book data
	response = requests.get(url)
	book_data = response.json()

	# Extract the data we need from the book data JSON
	identifier = key
	title = book_data["volumeInfo"]["title"]
	author_name = book_data["volumeInfo"]["authors"][0]
	description = book_data["volumeInfo"].get("description")

	# Check if an Author object already exists for the book's author
	try:
		author = Author.objects.get(name=author_name)
	except Author.DoesNotExist:
		# If no Author object exists, create one
		author = Author.objects.create(name=author_name)

	# Create a Book object using the extracted data
	book = Book.objects.create(
		identifier=identifier,
		title=title,
		author=author,
		description=description,
	)

	# Return the newly created Book object
	return book