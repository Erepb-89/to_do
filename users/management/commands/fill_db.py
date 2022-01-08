from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        # User.objects.all().delete()
        # User.objects.create_superuser(username='erepb', password='1')
        # User.objects.create(username='admin', password='111', first_name='admin', last_name='adminoff',
        #                     email='admin@yandex.ru')
        # User.objects.create(username='ivanoff', password='222', first_name='petr', last_name='ivanoff',
        #                     email='ivanoff@yandex.ru')
        # User.objects.create(username='petroff', password='333', first_name='valiliy', last_name='petroff',
        #                     email='petroff@yandex.ru')
        # User.objects.create(username='sidiroff', password='444', first_name='sergey', last_name='sidiroff',
        #                     email='sidiroff@mail.ru')
        # User.objects.create(username='egoroff', password='555', first_name='ivan', last_name='egoroff',
        #                     email='egoroff@mail.ru')
        User.objects.create(username='test', password='123', first_name='test', last_name='testoff',
                            email='test@mail.ru')
