import uuid as uuid_lib

from django.db import models
from games.models import Game


# !!! Now scalable, rework for different types of products !!!
class SaleManager(models.Manager):
    def create(self, **obj_data):
        game_data = obj_data.pop('game')
        game_instance = Game.objects.create(**game_data)
        obj_data['game'] = game_instance

        return super().create(**obj_data)


class Sale(models.Model):
    uuid = models.UUIDField(
        db_index=True,
        unique=True,
        default=uuid_lib.uuid4,
        editable=False
    )
    game = models.OneToOneField(
        Game, on_delete=models.CASCADE
    )
    NA_sales = models.FloatField(
        help_text='Game sales in North America (in millions of units)',
        blank=True
    )
    EU_sales = models.FloatField(
        help_text='Game sales in the European Union (in millions of units)',
        blank=True
    )
    JP_sales = models.FloatField(
        help_text='Game sales in Japan (in millions of units)',
        blank=True
    )
    other_sales = models.FloatField(
        help_text='Game sales in the rest of the world, i.e. Africa, Asia'
                  'excluding Japan, Australia, Europe excluding the E.U. and',
        blank=True
    )
    global_sales = models.FloatField(
        help_text='Total sales in the world (in millions of units)',
        blank=True
    )

    objects = SaleManager()

    def delete(self, using=None, keep_parents=False):
        if self.game:
            self.game.delete()
        super().delete(using)

    def __str__(self):
        return f'{self.game}'
