from django.urls import path,include
from rest_framework import routers
from .views import AuthorViewSet, BookReviewViewSet, LoginView, LogoutView, RegisterView, BookViewSet

router = routers.DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'reviews', BookReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('register/', RegisterView.as_view(), name='user-detail'),
]
