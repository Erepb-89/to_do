import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
from users.models import User
from users.views import UserCustomViewSet


class TestUsersViewSet(TestCase):

    def setUp(self) -> None:
        self.user_data = {'username': 'User_test',
                          'first_name': 'Testname',
                          'last_name': 'Testlastname',
                          'email': 'Test@mail.com'}
        self.user_url = '/api/users/'
        self.admin = User.objects.create_superuser(username='admin1', email='adm@mail.ru', password='12345678')

    def test_get_user_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/filters/project/')
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.user_url, self.user_data, format='json')
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.user_url, self.user_data, format='json')
        force_authenticate(request, self.admin)
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
