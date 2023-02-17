# Generated by Django 4.1.6 on 2023-02-16 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book_store', '0004_remove_author_bio_remove_author_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='author',
            name='id',
        ),
        migrations.RemoveField(
            model_name='book',
            name='id',
        ),
        migrations.AlterField(
            model_name='author',
            name='identifier',
            field=models.CharField(max_length=150, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='book',
            name='identifier',
            field=models.CharField(max_length=150, primary_key=True, serialize=False),
        ),
    ]
