import random
from django.core.management.base import BaseCommand

from project.models import Project, ToDo
from users.models import User


class Command(BaseCommand):
    users = User.objects.all()
    users_id = [user.id for user in users]
    usernames = [user.username for user in users]

    def handle(self, *args, **options):
        Project.objects.all().delete()
        ToDo.objects.all().delete()

        for num_project in range(1, 26):
            prj_name = f'project_{num_project}'
            prj_link = f'http://github.com/{prj_name}'

            Project.objects.create(name=prj_name, rep_link=prj_link)
            Project.objects.get(name=prj_name).users.add(
                *random.sample(list(self.users_id), 3)
            )

            for num in range(1, 4):
                username = random.sample(self.usernames, 1)[0]
                todo_text = f'zametka_{num}_to_{prj_name}_by_{username}'
                ToDo.objects.create(text=todo_text, is_active=True,
                                    project=Project.objects.get(name=prj_name),
                                    user=User.objects.get(username=username))
