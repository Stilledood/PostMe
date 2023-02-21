from django.contrib import admin
from .models import Story

@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    search_fields = ['user__username','user__email']
    class Meta:
        model = Story



