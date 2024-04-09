from django.contrib.auth import get_user_model
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json


User = get_user_model()


class NotificationConsumer(AsyncWebsocketConsumer):
    """Notification Consumer

    This consumer deals with sending notifications to users
    """

    async def connect(self):
        self.user = self.scope["user"]
        # private notification group
        self.notification_group_name = self.user.username + "__notifications"

        if not self.user.is_authenticated:
            await self.close()
        else:
            await self.accept()

            await self.channel_layer.group_add(
                self.notification_group_name,
                self.channel_name,
            )

    async def disconnect(self, close_code):
        #  Set user status to false
        await self.change_user_status(False)
        #  Discard connection
        await self.channel_layer.group_discard(
            self.notification_group_name,
            self.channel_name,
        )

        # return super().disconnect(close_code)

    async def receive(self, text_data=None, bytes_data=None):

        content = json.loads(text_data)
        message_type = content["type"]

        if message_type == "received_messages":
            # Add to database and send to room
            await self.mark_as_received()

    @database_sync_to_async
    def send_unread_messages_count(self):

        # Get all chats and count of unread messages
        pass

   
    async def read_chat(self, event):
        await self.send(text_data=json.dumps(event))