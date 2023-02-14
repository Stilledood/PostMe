from rest_framework import authentication
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomAuthentication(authentication.BasicAuthentication):

    def authenticate(self, request):
        qs = User.objects.all()
        user = qs.order_by("?").first()
        return (user,None)

