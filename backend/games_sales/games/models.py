from django.db import models


class Rating(models.Model):
    critic_score = models.FloatField(
        help_text='Aggregate score compiled by Metacritic staff',
        null=True, blank=True)
    critic_count = models.FloatField(
        help_text='The number of critics used in coming up with the Critic_score',
        null=True, blank=True)
    user_score = models.FloatField(
        help_text='Score by Metacritic`s subscribers',
        null=True, blank=True)
    user_count = models.FloatField(
        help_text='Number of users who gave the user_score',
        null=True, blank=True)


class Game(models.Model):
    class ESRBRatings(models.TextChoices):
        KA = 'K-A', 'Kids to Adults, 6+'
        M = 'M', 'Mature, 17+'
        RP = 'RP', 'Rating Pending'
        E = 'E', 'Everyone'
        AO = 'AO', 'Adults Only, 18+'
        E10PLUS = 'E10+', 'Everyone 10+'
        EC = 'EC', 'Early Childhood, 3+'
        T = 'T', 'Teen, 13+'

    name = models.CharField(
        max_length=120,
        unique=True
    )
    platform = models.CharField(
        max_length=30,
        null=True, blank=True
    )
    publisher = models.CharField(
        max_length=30,
        null=True, blank=True
    )
    developer = models.CharField(
        max_length=30,
        null=True, blank=True
    )
    genre = models.CharField(
        max_length=30,
        null=True, blank=True
    )
    year_of_release = models.IntegerField(
        null=True, blank=True
    )
    # rating = models.OneToOneField(Rating, on_delete=models.CASCADE)

    #  Later restrict to only Choices
    esrb_rating = models.CharField(
        max_length=4,
        blank=True,
        null=True,
        choices=ESRBRatings.choices
    )

    def __str__(self):
        return f'{self.name}, {self.esrb_rating}'
