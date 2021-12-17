from django.contrib import admin
from django.urls import path, include

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from project.views import ToDoParamFilterViewSet, ProjectParamFilterViewSet
from users.views import UserModelViewSet

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('filters/project', ProjectParamFilterViewSet)
router.register('filters/todo', ToDoParamFilterViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='ToDo',
        default_version='',
        description='Documentation for our ToDo project',
        contact=openapi.Contact(email='test@mail.ru'),
        license=openapi.License(name='ToDo License'),
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),

    # path('filters/', include(filter_router.urls)),

    path('swagger/', schema_view.with_ui('swagger')),
    path('redoc/', schema_view.with_ui('redoc')),
    path('swagger/<str:format>/', schema_view.without_ui()),

    path("graphql/", GraphQLView.as_view(graphiql=True))
]
