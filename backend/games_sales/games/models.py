from django.db import models


class Rating(models.Model):
    critic_score = models.FloatField()
    critic_count = models.FloatField()
    user_score = models.FloatField()
    user_count = models.FloatField()


class SaleInfo(models.Model):
    NA_sales = models.FloatField()
    EU_sales = models.FloatField()
    JP_sales = models.FloatField()
    other_sales = models.FloatField()
    global_sales = models.FloatField()


class Game(models.Model):
    name = models.CharField(max_length=120, unique=True)
    platform = models.CharField(max_length=30, blank=True)
    publisher = models.CharField(max_length=30, blank=True)
    developer = models.CharField(max_length=30, blank=True)
    genre = models.CharField(max_length=30, blank=True)
    year_of_release = models.IntegerField(blank=True)
    esrb_rating = models.CharField(max_length=1, blank=True)
    game_rating = models.ForeignKey(Rating, null=True, blank=True, on_delete=models.CASCADE)
    sale_info = models.ForeignKey(SaleInfo, null=True, blank=True, on_delete=models.CASCADE)

