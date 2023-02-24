from django.shortcuts import render,redirect
from django.views.generic import View
from django.http import JsonResponse,HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from django.utils.http import url_has_allowed_host_and_scheme
from django.conf import settings
from .models import Story
from .form import StoryForm
from .serializers import StorySerializer,StoryActionSerializer
from rest_framework.response import Response
import random

def home_view(request,*args,**kwargs):
    return render(request,template_name='home.html',context={})

class StoriesList(APIView):
    '''API View'''

    model_class = Story

    def get(self,request):
        qs = self.model_class.objects.all()
        serializer = StorySerializer(qs,many=True)
        return Response(serializer.data)





class StoriesListWithDjango(View):

    model_class = Story

    def get(self,request):
        qs = self.model_class.objects.all()
        stories_list = [x.serialize() for x in qs]
        stories_json = {
            'response':stories_list
        }

        return JsonResponse(stories_json,status=200)

# new class -use REST
class StoryCreateWithSerializer(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def post(self,request):
        serializer = StorySerializer(data=request.POST)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data,status=201)
        return Response({},status=400)


# Old view -use pure django
class StoryCreateWithDjango(View):
    model_class = Story
    form_class = StoryForm
    template_name = 'storytime/story_create.html'

    def get(self,request):
        return render(request,self.template_name,context={'form':self.form_class()})

    def post(self,request):
        if not request.user.is_authenticated:
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({},status = 401)
            return redirect(settings.LOGIN_URL)

        bound_form = self.form_class(request.POST)
        next_url = request.POST.get('next')
        if bound_form.is_valid():
            story = bound_form.save(commit=False)
            user = request.user
            story.user = user
            story.save()
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse(story.serialize(),status=201)
            if url_has_allowed_host_and_scheme(next_url,settings.ALLOWED_HOSTS):
                return redirect(next_url)
        else:
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse(bound_form.errors,status=400)
            return render(request,self.template_name,context={'form':bound_form})

# old view -using Pure Django
class StoryDetailsWithDjango(View):

    model_class = Story
    def get(self,request,story_id):
        data ={}
        try:
            story = self.model_class.objects.get(pk=story_id)
            data = story.serialize()
        except:
            data ={
                'content':'Story not found'
            }
        return JsonResponse(data,status=200)

# new view -Apiview to display details of a story object
class StoryDetails(APIView):

    '''API view'''

    model_class = Story

    def get(self,request,story_id):
        try:
            story = self.model_class.objects.get(pk=story_id)
            serializer = StorySerializer(story)
            return Response(serializer.data,status=200)
        except:
            return Response({},status=404)

class StoryDelete(APIView):
    '''API view to delete a story'''

    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    model_class = Story

    def delete(self,request,story_id):
        try:
            story = self.model_class.objects.get(pk=story_id)
            if story.user == request.user:
                story.delete()
                return Response({"message":"Story successfully deleted"},status=200)
        except:
            return Response({"message":"You can not delete this"},status=401)

class StoryAction(APIView):
    '''
    Allowed actions : Like,Unlike,Repost
    '''

    model_class = Story
    def post(self,request):
        serializer = StoryActionSerializer(request.POST)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            try:
                story = self.model_class.get(pk=data.get("id"))
                user = request.user
                action = data.get("action")
                if action == "like":
                    if user not in story.likes.all():
                        story.likes.add(user)
                    else:
                        story.likes.remove(user)
                if action == "unlike":
                    if user in story.likes.all():
                        story.likes.remove(user)
                if action == "repost":
                    pass
                    # to do
            except:
                return Response({},status=404)









