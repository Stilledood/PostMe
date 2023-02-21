from django.db import models

class Story(models.Model):

    content = models.TextField(blank=True,null=True)
    image = models.FileField(blank=True,null=True)

    class Meta:
        ordering = ['-pk']

    def serialize(self):
        return {
            'id':self.pk,
            'content':self.content,
            'likes':10
        }



