from django.contrib import admin
from .models import Story,StoryLike



class StoryLikeAdmin(admin.TabularInline):
    model = StoryLike

@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):

    inlines = (StoryLikeAdmin,)
    search_fields = ('user__username','user__email','content')
    list_display = ('__str__','user',)
    class Meta:
        model = Story


