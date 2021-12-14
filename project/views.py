from rest_framework import permissions
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, ListModelMixin, DestroyModelMixin, \
    CreateModelMixin

# from .filters import ProjectFilter
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectParamFilterViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer

    # pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        name = self.request.query_params.get('project', '')
        projects = Project.objects.all()
        if name:
            projects = projects.filter(name__contains=name)
        return projects


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoParamFilterViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer

    # pagination_class = ToDoLimitOffsetPagination

    def get_queryset(self):
        project = self.request.query_params.get('project', '')
        todo = ToDo.objects.all()
        if project:
            todo = todo.filter(project__name__contains=project)
        return todo

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
