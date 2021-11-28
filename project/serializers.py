from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer

from project.models import ToDo, Project
from users.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'
