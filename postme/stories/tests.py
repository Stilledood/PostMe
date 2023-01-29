from django.test import TestCase
from .models import Story
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

class StoryTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='Gigi',password='testuserpassword')
        Story.objects.create(content='my first test story',user=self.user)
        Story.objects.create(content='my first test story 2', user=self.user)
        Story.objects.create(content='my first test story 3', user=self.user)

    def test_story_created(self):
        story = Story.objects.create(content='my second test story 4',user=self.user)
        self.assertEqual(story.id,4)
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
        self.assertEqual(content[0]['id'],3)
        self.assertEqual(len(content),3)

    def test_action_like(self):
        client = self.get_client()
        response = client.post("/stories/action",{"id":1,"action":"like"})
        self.assertEqual(response.status_code,200)
        like_count = response.json().get('likes')
        self.assertEqual(like_count,1)

    def test_action_unlike(self):
        client = self.get_client()
        response = client.post("/stories/action", {"id": 2, "action": "like"})
        self.assertEqual(response.status_code,200)
        response = client.post("/stories/action",{"id":2,"action":"unlike"})
        self.assertEqual(response.status_code,200)
        like_count = response.json().get('likes')
        self.assertEqual(like_count,0)

    def test_action_repost(self):
        client = self.get_client()
        response = client.post("/stories/action", {"id": 2, "action": "repost"})
        self.assertEqual(response.status_code,201)
        data = response.json()
        new_story_id= data.get('id')
        self.assertNotEqual(new_story_id,2)













