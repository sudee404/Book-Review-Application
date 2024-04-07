from rest_framework import serializers
from .models import Book, BookReview, Author, BookClub, Notification, UserBook
from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models

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


class UserDataSerializer(serializers.ModelSerializer):
    """Serializer definition for UserData."""
    fullname = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    bio = serializers.SerializerMethodField()

    class Meta:
        """Meta definition for UserDataSerializer."""

        model = models.User
        fields = ('username', 'email', 'fullname', 'image', 'bio')
        
    def get_fullname(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    def get_image(self, obj):
        return obj.profile.image.url if obj.profile.image else None
    
    def get_bio(self, obj):
        return obj.profile.bio


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


class UserBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserBook
        fields = ('__all__')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('__all__')


class BookClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookClub
        fields = ('__all__')


class NotificationSerializer(serializers.ModelSerializer):
    """Serializer definition for Notification."""

    class Meta:
        """Meta definition for NotificationSerializer."""

        model = Notification
        fields = ('__all__')


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer definition for UserProfile."""

    class Meta:
        """Meta definition for UserProfileSerializer."""

        model = models.UserProfile
        fields = ('__all__')
