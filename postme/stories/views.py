from django.shortcuts import render,redirect
from django.views.generic import View
from django.http import JsonResponse
from django.utils.http import url_has_allowed_host_and_scheme
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
import json
from .forms import StoryForm
from .models import Story
from .serializers import StorySerializer



class StoryListWithSerailizer(APIView):
    '''Class to construct a list of all Story objects from database (using REST serailizer instead of manual process all data) and send this list to frontend'''

    model_class = Story

    def get(self,request):
        qs = self.model_class.objects.all()
        serializer = StorySerializer(qs,many=True)
        return Response(serializer.data)


class StoriesListWithDjango(View):
    '''Class to create a view to display all stories from database -in Json format so we can consume it via javascript'''

    model_class = Story

    def get(self,request):
        stories_queryset = self.model_class.objects.all()
        list_stories = [x.serialize() for x in stories_queryset]
        data = {
            "response":list_stories
        }
        return JsonResponse(data)

class StoryDetailsWithDjango(View):
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

class StoryDetailsWithSerializer(APIView):
    '''Create a view fot Story objects details using REST'''

    model_class = Story

    def get(self,requets,storyId):
        try:
            story = self.model_class.objects.filter(pk=storyId)
        except:
            return Response({},status=404)

        obj = story.first()
        serializer = StorySerializer(obj)
        return Response(serializer.data,status=200)



class StoryCreateWithSerializer(APIView):
    '''Class to allow us to create a story object in the database and send back to frontend'''

    def post(self,request):
        serializer = StorySerializer(data=request.POST)

        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data,status=201)
        else:
            return Response({},status=400)





class StoryCreateWithPureDjango(View):
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







    





