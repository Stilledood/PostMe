from django.urls import path
from .views import StoryDetailsWithSerializer,StoryCreateWithSerializer,StoryListWithSerailizer,StoryDelete

urlpatterns = [
    path("",StoryListWithSerailizer.as_view(),name="stories"),
    path("<int:storyId>",StoryDetailsWithSerializer.as_view(),name="story_details"),
    path("create-story",StoryCreateWithSerializer.as_view(),name="create_story"),
    path("<int:storyId>/delete", StoryDelete.as_view(), name="delete_story"),




]