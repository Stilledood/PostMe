from django.contrib import admin
from .models import Story,StoryLike

class StoryLikeAdmin(admin.TabularInline):

    model = StoryLike



@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    inlines = [StoryLikeAdmin,]
    search_fields = ['user__username','user__email']
    class Meta:
        model = Story


class StoryLikeAdmin(admin.ModelAdmin):

    class Meta:
        model = StoryLike



