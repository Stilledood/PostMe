from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class StoryLike(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    story = models.ForeignKey("Story",on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Story(models.Model):
    '''Class to construct the model class for stories'''

    parent = models.ForeignKey("self",null=True,on_delete=models.SET_NULL)
    content = models.TextField(blank=True,null=True)
    image = models.FileField(upload_to='images/', null=True,blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    likes = models.ManyToManyField(User,related_name='story_user',null=True,through=StoryLike)
    timestamp = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-pk']

    def __str__(self):
        try:
            obj =  self.content[:10]
        except:
            obj = "No text , only photo"
        return obj

    def serialize(self):
        return {
            "id":self.pk,
            "content":self.content
        }




