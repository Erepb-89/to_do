import json
from django.test import TestCase

from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from users.models import User
from users.views import UserModelViewSet
from .views import ProjectParamFilterViewSet
from .models import Project, ToDo


class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.username = 'admin1'
        self.email = 'adm@mail.ru'
        self.password = '12345678'

        self.project_data = {'name': 'New_project_test',
                             'rep_link': 'http://github.com/new_project_test/',
                             'users': [7]}
        self.project_data_put = {'name': 'Bad_project',
                                 'rep_link': 'http://github.com/bad_project_test/'}
        self.project_url = '/api/filters/project/'
        self.user_data = {'username': 'User_test',
                          'first_name': 'Testname',
                          'last_name': 'Testlastname',
                          'email': 'Test@mail.com'}
        self.user_url = '/api/users/'
        self.admin = User.objects.create_superuser(username=self.username, email=self.email, password=self.password)
        # self.admin.set_password(self.password)
        # self.admin.save()

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/filters/project/')
        view = ProjectParamFilterViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_project_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.project_url, self.project_data, format='json')
        view = ProjectParamFilterViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_project_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.project_url, self.project_data, format='json')
        force_authenticate(request, self.admin)
        view = ProjectParamFilterViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.user_url, self.user_data, format='json')
        force_authenticate(request, self.admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        project = Project.objects.create(name='New_project_test',
                                         rep_link='http://github.com/new_project_test/')
        Project.objects.get(name='New_project_test').users.add(User.objects.get(username='admin1').id)
        client = APIClient()
        response = client.get(f'{self.project_url}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_guest(self):
        project = Project.objects.create(**self.project_data)
        Project.objects.get(name='New_project_test').users.add(User.objects.get(username='admin1').id)
        client = APIClient()
        response = client.put(f'{self.project_url}{project.id}/', self.project_data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_admin(self):
        project = Project.objects.create(**self.project_data)
        Project.objects.get(name='New_project_test').users.add(User.objects.get(username='admin1').id)
        client = APIClient()
        client.login(username=self.username, password=self.password)
        response = client.put(f'{self.project_url}{project.id}/', self.project_data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        project = Project.objects.create(name='New_project_test',
                                         rep_link='http://github.com/new_project_test/')
        client = APIClient()
        response = client.put(f'{self.project_url}{project.id}/', {'name': 'New_project_test_changed',
                                                                   'rep_link': 'http://github.com/new_project_test_changed/'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        # project = Project.objects.create(name='New_project_test',
        #                                  rep_link='http://github.com/new_project_test')
        project = mixer.blend(Project)
        client = APIClient()

        client.login(username=self.username, password=self.password)

        response = client.put(f'{self.project_url}{project.id}/', {'name': 'New_project_test_changed',
                                                                   'rep_link': 'http://github.com/new_project_test_changed/'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'New_project_test_changed')
        self.assertEqual(project.rep_link, 'http://github.com/new_project_test_changed/')
        client.logout()

    def tearDown(self) -> None:
        pass


class TestProjectAPITestCase(APITestCase):
    def setUp(self) -> None:
        self.username = 'admin1'
        self.email = 'adm@mail.ru'
        self.password = '12345678'

        self.project_data = {'name': 'New_project_test',
                             'rep_link': 'http://github.com/new_project_test/',
                             'users': [7]}
        self.project_url = '/api/filters/project/'
        self.admin = User.objects.create_superuser(self.username, self.email, self.password)

    def test_get_list_todo(self):
        response = self.client.get(self.project_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.post(self.project_url, self.project_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def tearDown(self) -> None:
        pass
