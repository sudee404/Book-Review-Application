from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

# Create your models here.


class UserProfile(models.Model):
    """Model definition for UserProfile."""

    user = models.OneToOneField(
        User, related_name='profile', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile_pictures/')
    bio = models.TextField()

    class Meta:
        """Meta definition for UserProfile."""

        verbose_name = 'UserProfile'
        verbose_name_plural = 'UserProfiles'

    def __str__(self):
        """Unicode representation of UserProfile."""
        return self.user


class Book(models.Model):
    """Model definition for Book."""

    identifier = models.CharField(primary_key=True, max_length=200)

    class Meta:
        """Meta definition for Book."""
        ordering = ['identifier']
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
    rating = models.DecimalField(decimal_places=1, max_digits=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        """Meta definition for BookReview."""
        ordering = ['-created_at']
        verbose_name = 'Book Review'
        verbose_name_plural = 'Book Reviews'

    def __str__(self):
        """Unicode representation of BookReview."""
        self.review


class BookClub(models.Model):
    """Model definition for BookClub."""

    name = models.CharField(max_length=250)
    description = models.TextField()
    members = models.ManyToManyField(User, related_name='book_clubs')
    created_at = models.DateTimeField(auto_now_add=True)
    poster = models.ImageField(upload_to='poster/', default='default.png')
    private = models.BooleanField(default=False)  # True if club is open to join
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        """Meta definition for BookClub."""

        verbose_name = 'Book Club'
        verbose_name_plural = 'Book Clubs'
        ordering = ['-created_at']

    def __str__(self):
        """Unicode representation of BookClub."""
        self.name


class UserBook(models.Model):
    """Model definition for UserBook."""

    class StatusChoices(models.TextChoices):
        CURRENTLY_READING = 'CR', _('Currently Reading')
        PLANNING_TO_READ = 'PR', _('Planning to Read')
        ALREADY_READ = 'AR', _('Already Read')

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user_books')
    book = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name='user_books')
    status = models.CharField(
        max_length=2, choices=StatusChoices.choices, default=StatusChoices.PLANNING_TO_READ)
    started_reading_at = models.DateTimeField(null=True, blank=True)
    finished_reading_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'book')


class ClubBook(models.Model):
    """Model definition for ClubBook."""

    class StatusChoices(models.TextChoices):
        CURRENTLY_READING = 'CR', _('Currently Reading')
        PLANNING_TO_READ = 'PR', _('Planning to Read')
        ALREADY_READ = 'AR', _('Already Read')

    club = models.ForeignKey(
        BookClub, on_delete=models.CASCADE, related_name='books')
    book = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name='clubs')
    status = models.CharField(
        max_length=2, choices=StatusChoices.choices, default=StatusChoices.PLANNING_TO_READ)
    started_reading_at = models.DateTimeField(null=True, blank=True)
    finished_reading_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('club', 'book')


class BookVote(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    book_club = models.ForeignKey(BookClub, on_delete=models.CASCADE)
    voters = models.ManyToManyField(User, verbose_name='book voters')

    def get_votes(self):
        return self.voters.count()


class Notification(models.Model):
    """Model definition for Notification."""

    recipient = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        """Meta definition for Notification."""

        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'

    def __str__(self):
        """Unicode representation of Notification."""
        return f"{self.recipient} Notifications"
