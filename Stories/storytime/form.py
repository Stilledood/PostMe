from django import forms
from .models import Story
from django.conf import settings

MAX_STORY_LENGHT = settings.MAX_STORY_LENGHT
class StoryForm(forms.ModelForm):
    class Meta:
        model = Story
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get('content')
        if len(content) > MAX_STORY_LENGHT:
            raise forms.ValidationError('Story to long')
        return content




