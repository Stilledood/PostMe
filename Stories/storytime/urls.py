from django.urls import path
from .views import StoryDetails,StoryCreateWithSerializer,StoriesList

urlpatterns = [
    path('',StoriesList.as_view(),name='list_stories'),
    path('create-story',StoryCreateWithSerializer.as_view(),name='story_create'),
    path('<int:story_id>',StoryDetails.as_view(), name='story_details')

]