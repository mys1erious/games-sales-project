from django.db import models

from core.models import TimeStampedModel


def upload_to(instance, filename):
    return f'test_app/{filename}'


class Test(TimeStampedModel):
    name = models.CharField(
        max_length=120,
        unique=True
    )
    bio = models.TextField(default='no bio...')
    avatar = models.ImageField(upload_to=upload_to, default='profiles/no_image.png')

    def __str__(self):
        return f'Test instance: {self.name}'
