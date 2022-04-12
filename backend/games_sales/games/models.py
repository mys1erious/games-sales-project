from django.db import models


class Game(models.Model):
    name = models.CharField(max_length=120, unique=True)
    platform = models.CharField(max_length=30, )
    year_of_release = models.IntegerField()
    genre = models.CharField(max_length=30)
    publisher = models.CharField(max_length=30)
    developer = models.CharField(max_length=30)
    esrb_rating = models.CharField(max_length=1)
    game_rating = Rating()
    sale_info = SaleInfo()


class Rating(models.Model):
    game = ...  # Game Model ?
    critic_score = models.FloatField()
    critic_count = models.FloatField()
    user_score = models.FloatField()
    user_count = models.FloatField()


class SaleInfo(models.Model):
    game = ...  # Game Model
    NA_sales = models.FloatField()
    EU_sales = models.FloatField()
    JP_sales = models.FloatField()
    other_sales = models.FloatField()
    global_sales = models.FloatField()
