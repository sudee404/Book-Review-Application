# Generated by Django 4.1.7 on 2023-02-21 14:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('book_store', '0011_alter_book_options_alter_bookreview_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookVote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='book_store.book')),
                ('book_club', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='book_store.bookclub')),
                ('voters', models.ManyToManyField(to=settings.AUTH_USER_MODEL, verbose_name='book voters')),
            ],
        ),
        migrations.CreateModel(
            name='UserBook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('CR', 'Currently Reading'), ('PR', 'Planning to Read'), ('AR', 'Already Read')], default='PR', max_length=2)),
                ('started_reading_at', models.DateTimeField(blank=True, null=True)),
                ('finished_reading_at', models.DateTimeField(blank=True, null=True)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_books', to='book_store.book')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_books', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'book')},
            },
        ),
    ]