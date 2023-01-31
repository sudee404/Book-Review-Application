from rest_framework import viewsets
from .models import Author, Book, BookReview
from .serializers import AuthorSerializer, BookReviewSerializer, BookSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

# Create your views here.

from django.contrib.auth import authenticate, login, logout
from rest_framework import status, views
from rest_framework.response import Response
from .serializers import LoginSerializer, UserSerializer


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
                login(request, user)
                return Response(UserSerializer(user).data)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class RegisterView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
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


def create_book(request):
    isbn = request.POST.get("isbn")
    book_data = fetch_book_data(isbn)

    if not book_data:
        return redirect("create_book")

    book_info = book_data[f"ISBN:{isbn}"]
    title = book_info["title"]
    author_name = book_info["authors"][0]["name"]
    publication_date = book_info["publish_date"]
    description = book_info.get("notes", "")

    author, _ = Author.objects.get_or_create(name=author_name)

    Book.objects.create(
        title=title,
        author=author,
        description=description,
        publication_date=publication_date,
    )

    return redirect("book_list")
