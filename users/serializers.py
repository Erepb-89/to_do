from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']


class UserModelSerializerAdvanced(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff']
