"""
ASGI config for book_api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels_auth_token_middlewares.middleware import SimpleJWTAuthTokenMiddlewareStack
from book_store import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'book_api.settings')

application = get_asgi_application()


application = ProtocolTypeRouter(
    {
        "http": application,
        "websocket": AllowedHostsOriginValidator(SimpleJWTAuthTokenMiddlewareStack(
            URLRouter(routing.websocket_urlpatterns))
        ),
    }
)
