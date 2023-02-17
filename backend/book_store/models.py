from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.


class Book(models.Model):
    """Model definition for Book."""

    identifier = models.CharField(primary_key=True,max_length=200)

    class Meta:
        """Meta definition for Book."""

        verbose_name = 'Book'
        verbose_name_plural = 'Books'

    def __str__(self):
        """Unicode representation of Book."""
        return self.identifier


class Author(models.Model):
    """Model definition for Author."""

    identifier = models.CharField(primary_key=True, max_length=200)

    class Meta:
        """Meta definition for Author."""

        verbose_name = 'Author'
        verbose_name_plural = 'Authors'

    def __str__(self):
        """Unicode representation of Author."""
        self.identifier


class BookReview(models.Model):
    """Model definition for BookReview."""

    book = models.ForeignKey(
        "Book", to_field="identifier", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    review = models.TextField()
    rating = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        """Meta definition for BookReview."""

        verbose_name = 'Book Review'
        verbose_name_plural = 'Book Reviews'
        

    def __str__(self):
        """Unicode representation of BookReview."""
        self.review
