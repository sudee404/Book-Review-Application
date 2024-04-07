from django.apps import AppConfig


class BookStoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'book_store'
    
    def ready(self) -> None:
        from . import signals
        return super().ready()
