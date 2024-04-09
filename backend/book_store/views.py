from rest_framework import status
from .serializers import AuthorSerializer, BookReviewSerializer, BookSerializer, BookClubSerializer, NotificationSerializer, UserBookSerializer, UserDataSerializer
from django.contrib.auth import authenticate, logout, get_user_model
from rest_framework import status, views, viewsets
from rest_framework.parsers import MultiPartParser,FormParser
from .serializers import LoginSerializer, UserSerializer
from .models import Author, Book, BookReview, BookClub, Notification, UserBook, UserProfile
from rest_framework.response import Response
from django.conf import settings
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from . import models, serializers
import jwt
import datetime
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class LoginView(views.APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid(raise_exception=True):
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)

            if user is not None:                   
                refresh = RefreshToken.for_user(user)
                token = str(refresh.access_token)
                expiration = refresh.access_token.get('exp')
                try:
                    return Response({'user': UserDataSerializer(user).data, 'token': token, 'exp': expiration}, status=status.HTTP_202_ACCEPTED)
                except User.profile.RelatedObjectDoesNotExist:
                    # create user profile
                    UserProfile.objects.create(user=user)
                    return Response({'user': UserDataSerializer(user).data, 'token': token, 'exp': expiration}, status=status.HTTP_202_ACCEPTED)

            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid input, please enter correct values'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class RegisterView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /projects endpoint"""
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = []


class BookReviewViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /reviews endpoint"""
    queryset = BookReview.objects.all().order_by('created_at')
    serializer_class = BookReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action == 'list':
            if book_id:=self.request.query_params.get('book', None):
                queryset = queryset.filter(book_id=book_id)
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateBookReviewSerializer
        return super().get_serializer_class()
    
    def perform_create(self, serializer):
        # read data
        book_id = self.request.data.get('book')
        book,created = Book.objects.get_or_create(identifier=book_id)
        # pass book and user to serializer
        serializer.save(book=book, user=self.request.user)
        
        return super().perform_create(serializer)



class UserBookViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /user_books endpoint"""
    queryset = UserBook.objects.all().order_by('user')
    serializer_class = UserBookSerializer
    authentication_classes = ()
    permission_classes = ()

    def list(self, request, *args, **kwargs):
        # Get book id to filter reviews
        book_id = request.query_params.get('book', None)
        user_id = request.query_params.get('user', None)

        if book_id and user_id:
            user_book = UserBook.objects.get(
                user__id=user_id, book__identifier=book_id)
            serializer = self.serializer_class(
                user_book, many=False, context={'request': request})

        elif user_id:
            user_books = UserBook.objects.filter(user__id=user_id)
            serializer = self.serializer_class(
                user_books, many=True, context={'request': request})

        else:
            queryset = super().get_queryset()
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

            # Get retrieved variables
            book_id = request.data['bookId']
            status_choice = request.data['status']

            # Set the user to the current authenticated user
            user = User.objects.get(username=payload['username'])
            # Create or get book
            book = Book.objects.get_or_create(
                identifier=book_id)[0]
            # Create userbook object
            user_book = UserBook.objects.get_or_create(
                book=book, user=user)[0]
            user_book.status = status_choice
            user_book.save()
            return Response({'message': f'Added to {status_choice} successfully'}, status=status.HTTP_201_CREATED)

        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.InvalidSignatureError:
            return Response({'error': 'Invalid token signature'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.DecodeError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except IndexError:
            return Response({'error': 'No token found, Kindly log in'}, status=status.HTTP_307_TEMPORARY_REDIRECT)


class AuthorViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /authors endpoint"""
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = []


class UserViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /users endpoint"""
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = []


class BookClubViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /books endpoint"""
    queryset = BookClub.objects.all()
    serializer_class = BookClubSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.CreateBookClubSerializer
        return super().get_serializer_class()
    
    def perform_create(self, serializer):
        # pass user to serializer
        serializer.save(owner=self.request.user)
        return super().perform_create(serializer)



class ClubMembersView(views.APIView):

    def post(self, request, *args, **kwargs):
        # Get the token from the Authorization header

        try:
            token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]

            # Decode the token
            payload = jwt.decode(
                token, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)

            # Set the user to the current authenticated user
            user = User.objects.get(username=payload['username'])
            # get club
            club = BookClub.objects.get(id=request.data['club_id'])
            club.members.add(user)
            club.save()

            return Response({'success': 'review added successfully'}, status=status.HTTP_201_CREATED)

        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.InvalidSignatureError:
            return Response({'error': 'Invalid token signature'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.DecodeError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except IndexError:
            return Response({'error': 'No token found, Kindly log in'}, status=status.HTTP_307_TEMPORARY_REDIRECT)


class ClubMemberRemoveView(views.APIView):

    def post(self, request, *args, **kwargs):
        # Get the token from the Authorization header

        try:
            token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]

            # Decode the token
            payload = jwt.decode(
                token, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)

            # Set the user to the current authenticated user
            user = User.objects.get(username=payload['username'])
            # get club
            club = BookClub.objects.get(id=request.data['club_id'])
            club.members.remove(user)
            club.save()

            return Response({'success': 'Club left successfully'}, status=status.HTTP_201_CREATED)

        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.InvalidSignatureError:
            return Response({'error': 'Invalid token signature'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.DecodeError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except IndexError:
            return Response({'error': 'No token found, Kindly log in'}, status=status.HTTP_307_TEMPORARY_REDIRECT)


class AddBookView(views.APIView):

    def post(self, request, *args, **kwargs):
        # Get the token from the Authorization header

        try:
            token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]

            # Decode the token
            payload = jwt.decode(
                token, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)

            # Set the user to the current authenticated user
            user = User.objects.get(username=payload['username'])
            # get club
            club = BookClub.objects.get(id=request.data['club_id'])
            book = Book.objects.get_or_create(
                identifier=request.data['book_id'])[0]
            club.books.add(book)
            club.save()

            return Response({'success': 'book added successfully'}, status=status.HTTP_201_CREATED)

        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.InvalidSignatureError:
            return Response({'error': 'Invalid token signature'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.DecodeError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except IndexError:
            return Response({'error': 'No token found, Kindly log in'}, status=status.HTTP_307_TEMPORARY_REDIRECT)


class NotificationViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /notifications/ endpoint"""

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class UserProfileViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /user-profiles/ endpoint"""

    queryset = models.UserProfile.objects.all()
    serializer_class = serializers.UserProfileSerializer
    permission_classes = [IsAuthenticated]
