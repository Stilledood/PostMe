from django.test import TestCase
from .models import Story
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

class StoryTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='Gigi',password='testuserpassword')
        Story.objects.create(content='my first test story',user=self.user)

    def test_story_created(self):
        story = Story.objects.create(content='my second test story',user=self.user)
        self.assertEqual(story.id,2)
        self.assertEqual(story.user,self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='testuserpassword')
        return client

    def test_story_list(self):
        client = self.get_client()
        response = client.get('/stories/')
        self.assertEqual(response.status_code,200)
        content = response.json()
        self.assertEqual(content[0]['id'],1)
        self.assertEqual(len(content),1)






