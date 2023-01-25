from django.shortcuts import render,redirect
from django.views.generic import View
from django.http import JsonResponse
from django.utils.http import url_has_allowed_host_and_scheme
from django.conf import settings
from .forms import StoryForm
from .models import Story



class StoriesList(View):
    '''Class to create a view to display all stories from database -in Json format so we can consume it via javascript'''

    model_class = Story

    def get(self,request):
        stories_queryset = self.model_class.objects.all()
        list_stories = [x.serialize() for x in stories_queryset]
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
        if not request.user.is_authenticated:
            if request.META.get("HTTP_X_REQUESTED_WITH") == "XMLHttpRequest":
                return JsonResponse({},status=401)
            return redirect(settings.LOGIN_URL)


        bound_form = self.form_class(request.POST)
        if bound_form.errors:
            if request.META.get("HTTP_X_REQUESTED_WITH") == "XMLHttpRequest":
                return JsonResponse(bound_form.errors, status=400)

        if bound_form.is_valid():
            obj = bound_form.save(commit=False)
            obj.user = request.user
            obj.save()
            if request.META.get("HTTP_X_REQUESTED_WITH") == "XMLHttpRequest" :
                return JsonResponse(obj.serialize(), status=201)


        return render(request, "components/forms.html", context={"form": self.form_class()})







    





