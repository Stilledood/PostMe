from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Story
from rest_framework.test import APIClient


# Create your tests here.

User = get_user_model()

class StoryTestCase(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create_user(username="florin",password="12345")
        Story.objects.create(content='abc',user=self.user)

    def test_user_created(self):
        self.assertEqual(self.user.username, 'florin')


    def test_create_story(self):
        story = Story.objects.create(content='my story',user=self.user)
        self.assertEqual(story.user,self.user)
        self.assertEqual(story.id,2)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username,password="12345")
        return client

    def test_stories_list(self):
        client = self.get_client()
        response = client.get("/stories/")
        self.assertEqual(response.status_code,200)
        self.assertEqual(len(response.json()),1)

    def test_story_detail(self):
        client = self.get_client()
        response = client.get("/stories/1")
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json()['id'],1)
        self.assertEqual(response.json()['content'], 'abc')

    def test_action_like(self):
        client = self.get_client()
        response = client.post("/stories/action",{"id":1,"action":"like"})
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json()['likes'],1)

    def test_action_unlike(self):
        client = self.get_client()
        response = client.post("/stories/action",{"id":1,"action":"unlike"})
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json()["likes"],0)

    def test_action_repost(self):
        client = self.get_client()
        response = client.post("/stories/action",{"id":1,"action":"repost"})
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json()["id"],2)
        self.assertEqual(response.json()["is_repost"],True)
        self.assertEqual(response.json()["original_story"]["id"],1)
      














