from django.urls import path
from .views import StoryDetailsWithSerializer,StoryCreateWithSerializer,StoryListWithSerailizer

urlpatterns = [
    path("",StoryListWithSerailizer.as_view(),name="stories"),
    path("<int:storyId>/",StoryDetailsWithSerializer.as_view(),name="story_details"),
    path("create-story/",StoryCreateWithSerializer.as_view(),name="create_story"),



]