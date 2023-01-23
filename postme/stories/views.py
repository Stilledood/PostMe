from django.shortcuts import render
from .models import Story
from django.views.generic import View
from django.http import JsonResponse
from .forms import StoryForm


class StoriesList(View):
    '''Class to create a view to display all stories from database -in Json format so we can consume it via javascript'''

    model_class = Story

    def get(self,request):
        stories_queryset = self.model_class.objects.all()
        list_stories = [{'id':x.id,'content':x.content} for x in stories_queryset]
        data = {
            "response":list_stories
        }
        return JsonResponse(data)

class StoryDetails(View):
    '''Class to create a view to extract a specific story from database and return it in Json format to be consumed by javascript'''

    model_class = Story

    def get(self,request,storyId):
        data ={
            "id":storyId,
        }
        try:
            story = self.model_class.objects.get(pk=storyId)
            data["content"] = story.content
        except:
            data["content"] = "Not found"

        return JsonResponse(data)

class StoryCreate(View):
    '''Class to allow users to add a story'''

    model_class = Story
    form_class = StoryForm

    def get(self,request):
        return render(request,"components/forms.html",context={"form":self.form_class()})

    def post(self,request):
        bound_form = self.form_class(request.POST)
        if bound_form.is_valid():
            obj = bound_form.save(commit=False)
            obj.save()
        return render(request,"components/forms.html",context={"form":self.form_class()})




    





