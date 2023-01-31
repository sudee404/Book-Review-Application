from rest_framework import serializers
from .models import Book, BookReview, Author
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class BookSerializer(serializers.HyperlinkedModelSerializer):
   class Meta:
        model = Book
        fields = ('__all__')

class BookReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BookReview
        fields = ('__all__')

class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = ('__all__')
