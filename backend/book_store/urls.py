from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'reviews', BookReviewViewSet)
router.register(r'user_books', UserBookViewSet)
router.register(r'users', UserViewSet)
router.register(r'clubs', BookClubViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('join_club/', ClubMembersView.as_view(), name='members-add'),
    path('leave_club/', ClubMemberRemoveView.as_view(), name='members-remove'),
    path('add_book/', AddBookView.as_view(), name='add-book'),
]
