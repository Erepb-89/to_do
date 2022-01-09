from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.create(username='test', password='123', first_name='test', last_name='testoff',
                            email='test@mail.ru')
