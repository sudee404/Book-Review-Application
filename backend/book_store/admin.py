from django.contrib import admin
from .models import Book, Author, BookReview, BookClub, ClubBook


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('identifier',)
    ordering = ('identifier',)


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('identifier',)
    ordering = ('identifier',)


@admin.register(BookReview)
class BookReviewAdmin(admin.ModelAdmin):
    list_display = ('book', 'user', 'rating', 'created_at')
    ordering = ('-created_at',)
    list_filter = ('book', 'user')


@admin.register(BookClub)
class BookClubAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'created_at')
    ordering = ('-created_at',)
    list_filter = ('owner',)

    filter_horizontal = ('members',)

admin.site.register(ClubBook)