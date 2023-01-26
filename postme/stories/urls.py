from django.urls import path
from .views import StoryDetails,StoryCreateWithSerializer,StoryListWithSerailizer

urlpatterns = [
    path("",StoryListWithSerailizer.as_view(),name="stories"),
    path("<int:storyId>/",StoryDetails.as_view(),name="story_details"),
    path("create-story/",StoryCreateWithSerializer.as_view(),name="create_story"),



]