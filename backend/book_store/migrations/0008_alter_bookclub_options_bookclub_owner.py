# Generated by Django 4.1.6 on 2023-02-19 06:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('book_store', '0007_bookclub'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bookclub',
            options={'ordering': ['name'], 'verbose_name': 'Book Club', 'verbose_name_plural': 'Book Clubs'},
        ),
        migrations.AddField(
            model_name='bookclub',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]