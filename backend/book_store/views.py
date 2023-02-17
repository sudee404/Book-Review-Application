import json

import requests
from .serializers import AuthorSerializer, BookReviewSerializer, BookSerializer
from django.contrib.auth import authenticate, logout, get_user_model
from rest_framework import viewsets
from rest_framework import status, views, viewsets
from .serializers import LoginSerializer, UserSerializer
from .models import Author, Book, BookReview
from rest_framework.response import Response
from django.conf import settings
from jwt import encode as jwt_encode
import jwt
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

                return Response({'message': 'Login successful', "token": token, 'userCred': payload})
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
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = []


class BookReviewViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /projects endpoint"""
    queryset = BookReview.objects.all().order_by('created_at')
    serializer_class = BookReviewSerializer
    authentication_classes = ()
    permission_classes = ()

    def list(self, request, *args, **kwargs):
        queryset = super().get_queryset()
        # Get book id to filter reviews
        book_id = request.query_params.get('book', None)
        if book_id is not None:
            queryset = queryset.filter(book_id=book_id)

        serializer = self.serializer_class(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        # Get the token from the Authorization header

        try:
            token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]

            # Decode the token
            payload = jwt.decode(
                token, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)

            # Set the user to the current authenticated user
            user = User.objects.get(username=payload['username'])
            # Create or get book
            book = Book.objects.get_or_create(
                identifier=f"{request.data['key']}")[0]
            # Create review
            review = BookReview.objects.create(
                book=book, user=user, review=request.data['review'], rating=request.data['rating'])

            return Response({'message': 'review added successfully'}, status=status.HTTP_201_CREATED)

        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.InvalidSignatureError:
            return Response({'error': 'Invalid token signature'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.DecodeError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except IndexError:
            return Response({'error': 'No token found, Kindly log in'}, status=status.HTTP_307_TEMPORARY_REDIRECT)


class AuthorViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /projects endpoint"""
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = []


class UserViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /projects endpoint"""
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = []
