from django.urls import path
from .views import StoriesList,StoryDetails,StoryCreate

urlpatterns = [
    path("",StoriesList.as_view(),name="stories"),
    path("<int:storyId>/",StoryDetails.as_view(),name="story_details"),
    path("create-story/",StoryCreate.as_view(),name="create_story"),



]