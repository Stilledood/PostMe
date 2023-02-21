from django import forms
from .models import Story

MAX_STORY_LENGHT = 500
class StoryForm(forms.ModelForm):
    class Meta:
        model = Story
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get('content')
        if len(content) > MAX_STORY_LENGHT:
            raise forms.ValidationError('Story too long')
        return content




