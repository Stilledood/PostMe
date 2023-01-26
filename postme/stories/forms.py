from django import forms
from .models import Story
from django.conf import settings


class StoryForm(forms.ModelForm):
    '''Class to create a form to allow users to add stories'''
    class Meta:
        model = Story
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > settings.MAX_STORY_LENGTH:
            raise  forms.ValidationError("This story is to long")
        return content