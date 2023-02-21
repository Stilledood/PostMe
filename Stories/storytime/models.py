from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Story(models.Model):

    content = models.TextField(blank=True,null=True)
    image = models.FileField(blank=True,null=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)

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



