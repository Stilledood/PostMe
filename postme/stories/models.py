from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Story(models.Model):
    '''Class to construct the model class for stories'''

    content = models.TextField(blank=True,null=True)
    image = models.FileField(upload_to='images/', null=True,blank=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
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




