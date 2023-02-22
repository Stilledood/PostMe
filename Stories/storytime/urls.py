from django.urls import path
from .views import StoriesList,home_view,StoryCreateWithDjango,StoryDetails

urlpatterns = [
    path('',StoriesList.as_view(),name='list_stories'),
    path('create-story',StoryCreateWithDjango.as_view(),name='story_create'),
    path('<int:story_id>',StoryDetails.as_view(), name='story_details')

]