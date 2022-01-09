from rest_framework import permissions, generics, viewsets
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin, ListModelMixin, CreateModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerAdvanced


class UserModelViewSet(viewsets.ModelViewSet):
    # renderer_classes = [JSONRenderer]
    # permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    pagination_class = PageNumberPagination

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerAdvanced
        return UserModelSerializer
