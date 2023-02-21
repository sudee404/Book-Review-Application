from rest_framework import status
from .serializers import AuthorSerializer, BookReviewSerializer, BookSerializer, BookClubSerializer, UserBookSerializer
from django.contrib.auth import authenticate, logout, get_user_model
from rest_framework import status, views, viewsets
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from .serializers import LoginSerializer, UserSerializer
from .models import Author, Book, BookReview, BookClub, UserBook
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
    """This is the viewset that handles all actions at /reviews endpoint"""
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
            review.save()
            return Response({'message': 'Review added successfully'}, status=status.HTTP_201_CREATED)

        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.InvalidSignatureError:
            return Response({'error': 'Invalid token signature'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.DecodeError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except IndexError:
            return Response({'error': 'No token found, Kindly log in'}, status=status.HTTP_307_TEMPORARY_REDIRECT)


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
    permission_classes = []
    parser_classes = [MultiPartParser]

    def list(self, request, *args, **kwargs):
        queryset = super().get_queryset()
        owner_id = request.query_params.get('owner', None)
        member_id = request.query_params.get('member', None)

        if owner_id:
            queryset = queryset.filter(owner_id=owner_id)
        if member_id:
            queryset = queryset.filter(members__id=member_id)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(
                page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        # if no results were found, return an empty response with next pointing to the second page
        paginator = self.pagination_class()
        paginator.page.number = 2
        return paginator.get_paginated_response([])


    def create(self, request, *args, **kwargs):
        # Get the token from the Authorization header

        try:
            token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]

            # Decode the token
            payload = jwt.decode(
                token, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)

            # Set the user to the current authenticated user
            user = User.objects.get(username=payload['username'])
            # Create Club
            name = request.data.get('name')
            description = request.data.get('description')
            poster = request.FILES.get('poster')

            # Create a new BookClub object with the given fields
            club = BookClub(name=name, description=description,
                            poster=poster, owner=user)
            club.save()

            return Response({'message': 'club added successfully'}, status=status.HTTP_201_CREATED)

        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.InvalidSignatureError:
            return Response({'error': 'Invalid token signature'}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.DecodeError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except IndexError:
            return Response({'error': 'No token found, Kindly log in'}, status=status.HTTP_307_TEMPORARY_REDIRECT)


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
