from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ClubBook, Notification, UserProfile
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    UserProfile.objects.get_or_create(user=instance)


@receiver(post_save, sender=ClubBook)
def create_notifications(sender, instance, created, **kwargs):
    if created:
        # create notification
        members = instance.club.members.all()
        for member in members:
            Notification.objects.create(
                recipient=member,
                message=f"New book added to {instance.club.name}",
                link=f"/club/{instance.club.id}",
            )


@receiver(post_save, sender=Notification)
def send_notification(sender, instance, created, **kwargs):
    if created:
        # send notification
        group_name = instance.recipient.username + "__notifications"
        channel_layer = get_channel_layer()
        count = instance.recipient.notifications.filter(read=False).count()
        # pass serialised notification
        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                "type": "unread_notifications",
                "count": count
            },
        )
