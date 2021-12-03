from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from project.views import ToDoParamFilterViewSet, ProjectParamFilterViewSet
from users.views import UserCustomViewSet

router = DefaultRouter()
router.register('users', UserCustomViewSet)
router.register('filters/project', ProjectParamFilterViewSet)
router.register('filters/todo', ToDoParamFilterViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token)
    # path('filters/', include(filter_router.urls)),
]
