from django.db import models

from core.models import TimeStampedModel
from profiles.models import Profile


class Report(TimeStampedModel):
    name = models.CharField(max_length=120)
    # image = models.ImageField ? for reports?
    remarks = models.TextField()
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'
