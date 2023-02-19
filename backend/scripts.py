import os
import django
import random
from faker import Faker
# Configure settings for project
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'book_api.settings')

django.setup()
from django.utils import timezone
from django.contrib.auth.models import User
from book_store.models import BookClub, Book

fake = Faker()

def populate(N=10):
    # create 10 book clubs
    for i in range(N):
        # generate random book club name and description
        name = fake.company()
        description = fake.paragraph()

        # create book club object and set owner to a random user
        book_club = BookClub.objects.create(
            name=name, description=description, owner=User.objects.order_by('?').first())

        # add random members to the book club
        num_members = random.randint(1, 5)
        for j in range(num_members):
            username = fake.user_name()
            email = fake.email()
            password = fake.password()
            user = User.objects.create_user(username, email, password)
            book_club.members.add(user)

        # add random books to the book club
        books = Book.objects.order_by('?')[:random.randint(1, 10)]
        book_club.books.set(books)

        # generate random created_at datetime within the past year
        created_at = fake.date_time_between(
            start_date='-1y', end_date='now', tzinfo=timezone.get_current_timezone())

        # set created_at datetime for book club
        book_club.created_at = created_at

        # save book club object
        book_club.save()
        print(f"{round((i+1)/N*100,1)}% complete")

def getCount():
    count = input('How many book clubs do you want to create: ')
    return count

if __name__ == '__main__':
    count = getCount()
    print('Populating the database...')
    populate(int(count))
    print('Populating complete!')