from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from project.models import ToDo, Project
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'
