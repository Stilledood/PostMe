from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL
class Story(models.Model):
    '''Class to construct the model class for stories'''

    content = models.TextField(blank=True,null=True)
    image = models.FileField(upload_to='images/', null=True,blank=True)

    class Meta:
        ordering = ['-pk']

    def serialize(self):
        return {
            "id":self.pk,
            "content":self.content
        }




