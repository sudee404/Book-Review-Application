from rest_framework import serializers
from .models import Book, BookReview, Author,BookClub
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class BookSerializer(serializers.ModelSerializer):
   class Meta:
        model = Book
        fields = ('__all__')


class BookReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookReview
        fields = ('__all__')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('__all__')


class BookClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookClub
        fields = ('__all__')
