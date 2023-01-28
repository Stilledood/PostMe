from rest_framework import serializers
from .models import Story
from django.conf import settings

ALLOWED_ACTIONS = settings.ALLOWED_ACTIONS

class StorySerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Story
        fields = ['content','likes','pk']

    def validate_content(self,value):
        if len(value) > settings.MAX_STORY_LENGTH:
            raise serializers.ValidationError("This story is to long")
        return value

    def get_likes(self,obj):
        return obj.likes.count()

class StoryActionSerializer(serializers.Serializer):

    id = serializers.IntegerField()
    action = serializers.CharField()

    def clean_action(self,value):
        value = value.lower().strip()
        if not value in ALLOWED_ACTIONS:
            raise serializers.ValidationError("this action is not allowed")
        return value







