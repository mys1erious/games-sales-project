from django.conf import settings
from django.db import models

from core.models import TimeStampedModel


def upload_to(instance, filename):
    return f'profiles/{filename}'


class Profile(TimeStampedModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(default='no bio...')
    avatar = models.ImageField(upload_to=upload_to, default='profiles/no_image.png')

    def __str__(self):
        return f'Profile of {self.user.username}'
