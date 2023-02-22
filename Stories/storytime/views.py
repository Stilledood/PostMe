from django.shortcuts import render,redirect
from django.views.generic import View
from django.http import JsonResponse,HttpResponse
from django.utils.http import url_has_allowed_host_and_scheme
from django.conf import settings
from .models import Story
from .form import StoryForm
import random

def home_view(request,*args,**kwargs):
    return render(request,template_name='home.html',context={})

class StoriesList(View):

    model_class = Story

    def get(self,request):
        qs = self.model_class.objects.all()
        stories_list = [x.serialize() for x in qs]
        stories_json = {
            'response':stories_list
        }

        return JsonResponse(stories_json,status=200)

class StoryCreate(View):
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

class StoryDetails(View):

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



