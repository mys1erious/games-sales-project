from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Game


@receiver(post_delete, sender=Game)
def post_delete_rating_on_game(sender, **kwargs):
    try:
        if kwargs['instance'].rating:
            kwargs['instance'].rating.delete()
    except:
        pass
