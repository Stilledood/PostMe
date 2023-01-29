from django.test import TestCase
from .models import Story
from django.contrib.auth import get_user_model

User = get_user_model()

class StoryTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='Gigi',password='testuserpassword')

    def test_story_created(self):
        story = Story.objects.create(content='test story',user=self.user)
        self.assertEqual(story.id,1)
        self.assertEqual(story.user,self.user)

    

