from rest_framework import serializers
from django.conf import settings
from .models import Story


MAX_STORY_LENGHT = settings.MAX_STORY_LENGHT
STORY_ACTION_OPTIONS = settings.STORY_ACTION_OPTIONS

class StoryActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True,required=False)

    def validate_action(self,value):
        if value.lower().strip() not in STORY_ACTION_OPTIONS:
            raise serializers.ValidationError(detail="Action not allowed",code=400)
        return value



class StoryCreateSerializer(serializers.ModelSerializer):

    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Story
        fields = ['id','content','likes']

    def get_likes(self,obj):
        return obj.likes.count()
    def validate_content(self,value):
        if len(value) > MAX_STORY_LENGHT:
            raise serializers.ValidationError("Story to long")
        return value

class StorySerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    original_story = StoryCreateSerializer(source='parent',read_only=True)

    class Meta:
        model = Story
        fields = ['id', 'content', 'likes','is_repost','original_story']

    def get_likes(self,obj):
        return obj.likes.count()







    

