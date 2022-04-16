import uuid as uuid_lib

from django.db import models
from games.models import Game


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
