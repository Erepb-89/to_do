from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from project.views import ProjectModelViewSet, ToDoModelViewSet
from users.views import UserModelViewSet

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('project', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth', include('rest_framework.urls')),
    path('api/', include(router.urls))
]
