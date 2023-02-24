from rest_framework import serializers
from django.conf import settings
from .models import Story


MAX_STORY_LENGHT = settings.MAX_STORY_LENGHT
STORY_ACTION_OPTIONS = settings.STORY_ACTION_OPTIONS

class StoryActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self,value):
        if value.lower().strip() not in STORY_ACTION_OPTIONS:
            raise serializers.ValidationError(detail="Action not allowed",code=400)
        return value


class StorySerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Story
        fields = ['id', 'content', 'likes']

    def get_likes(self,obj):
        return obj.likes.count()

    def validate_content(self,value):
        if len(value) > MAX_STORY_LENGHT:
            raise serializers.ValidationError(detail="Story to long",code=400)
        return value

    

