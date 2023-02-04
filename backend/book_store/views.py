from .serializers import AuthorSerializer, BookReviewSerializer, BookSerializer
from django.contrib.auth import authenticate, logout, get_user_model
from rest_framework import status, views, viewsets
from .serializers import LoginSerializer, UserSerializer
from .models import Author, Book, BookReview
from rest_framework.response import Response
from django.conf import settings
from jwt import encode as jwt_encode
import requests
import datetime

User = get_user_model()


class LoginView(views.APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            username = serializer.data['username']
            password = serializer.data['password']
            user = authenticate(username=username, password=password)
            if user:
                # Generate JWT token
                payload = {
                    "id": user.id,
                    "username": user.username,
                }

                # Get the JWT expiration delta from Django settings
                jwt_expiration_delta = getattr(
                    settings, "JWT_EXPIRATION_DELTA", None)
                if not jwt_expiration_delta:
                    raise AttributeError(
                        "Invalid JWT expiration delta setting")

                payload["exp"] = datetime.datetime.utcnow() + \
                    jwt_expiration_delta
                token = jwt_encode(
                    payload, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM
                )

                return Response({'message': 'Login successful', "token": token,'userCred':payload})
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class RegisterView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            # Generate JWT token
            payload = {
                "id": user.id,
                "username": user.username,
            }

            # Get the JWT expiration delta from Django settings
            jwt_expiration_delta = getattr(
                settings, "JWT_EXPIRATION_DELTA", None)
            if not jwt_expiration_delta:
                raise AttributeError(
                    "Invalid JWT expiration delta setting")

            payload["exp"] = datetime.datetime.utcnow() + \
                jwt_expiration_delta

            token = jwt_encode(
                payload, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM
            )
            return Response({'message': 'Registration successful', "token": token, 'userCred': payload}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /projects endpoint"""
    queryset = Book.objects.all().order_by('title')
    serializer_class = BookSerializer
    permission_classes = []


class BookReviewViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /projects endpoint"""
    queryset = BookReview.objects.all().order_by('created_at')
    serializer_class = BookReviewSerializer
    permission_classes = []


class AuthorViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /projects endpoint"""
    queryset = Author.objects.all().order_by('name')
    serializer_class = AuthorSerializer
    permission_classes = []


def load_books_from_api():
    # Make the API request
    response = requests.get("https://openlibrary.org/api/books")

    # Parse the response data
    data = response.json()
    books = data["books"]

    # Loop through the books and add them to the database
    for book in books:
        author, created = Author.objects.get_or_create(
            name=book["author"]
        )

        book_instance = Book(
            title=book["title"],
            author=author,
            publication_date=book["publication_date"],
            # Add other fields as required
        )
        book_instance.save()
