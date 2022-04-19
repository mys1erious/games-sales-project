from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Sale


@receiver(post_delete, sender=Sale)
def post_delete_game_on_sale(sender, **kwargs):
    try:
        if kwargs['instance'].game:
            kwargs['instance'].game.delete()
    except:
        pass
