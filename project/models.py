from django.db import models

from rest_framework.relations import StringRelatedField

from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=128, unique=True)
    rep_link = models.URLField(blank=True)
    users = models.ManyToManyField(User)
    # users = StringRelatedField(many=True)

    def __str__(self):
        return f'{self.name}'


class ToDo(models.Model):
    project = models.ForeignKey(Project, related_name='project', on_delete=models.CASCADE)
    text = models.CharField(max_length=256)
    is_active = models.BooleanField(default=True)
    date_create = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, related_name='user', on_delete=models.PROTECT)
