from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Story


# Create your tests here.

User = get_user_model()

class StoryTestCase(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create_user(username="florin",password="12345")

    def test_user_created(self):
        self.assertEqual(self.user.username, 'florin')


    def test_create_story(self):
        story = Story.objects.create(content='my story',user=self.user)
        self.assertEqual(story.user,self.user)
        self.assertEqual(story.id,1)

    




