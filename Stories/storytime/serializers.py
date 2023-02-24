from rest_framework import serializers
from django.conf import settings
from .models import Story


MAX_STORY_LENGHT = settings.MAX_STORY_LENGHT

class StoryActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

class StorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Story
        fields = ['content']

    def validate_content(self,value):
        if len(value) > MAX_STORY_LENGHT:
            raise serializers.ValidationError(detail="Story to long",code=400)
        return value

    

