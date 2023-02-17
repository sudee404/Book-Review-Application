# Generated by Django 4.1.6 on 2023-02-17 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book_store', '0005_remove_author_id_remove_book_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='identifier',
            field=models.CharField(max_length=200, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='book',
            name='identifier',
            field=models.CharField(max_length=200, primary_key=True, serialize=False),
        ),
    ]