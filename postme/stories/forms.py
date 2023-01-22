from django import forms
from .models import Story

MAX_LENGHT = 500
class StoryForm(forms.ModelForm):
    '''Class to create a form to allow users to add stories'''
    class Meta:
        model = Story
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > MAX_LENGHT:
            raise  forms.ValidationError("This story is to long")
        return content