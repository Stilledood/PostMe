from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class StoryLike(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    story = models.ForeignKey("Story",on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Story(models.Model):

    content = models.TextField(blank=True,null=True)
    image = models.FileField(blank=True,null=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    likes = models.ManyToManyField(User,related_name="story_user",blank=True,through=StoryLike)

    def __str__(self):
        return self.content[:10]

    class Meta:
        ordering = ['-pk']

    def serialize(self):
        return {
            'id':self.pk,
            'content':self.content,
            'likes':10
        }





