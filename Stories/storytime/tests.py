from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Story


# Create your tests here.

User = get_user_model()

class StoryTestCase(TestCase):

    def setUp(self) -> None:
        User.objects.create_user(username="florin",password="12345")

    def test_user_created(self):
        user = User.objects.get(username='florin')
        self.assertEqual(user.username, 'florin')



