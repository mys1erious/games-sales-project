from rest_framework import serializers

from ..models import Sale
from games.api.serializers import GameSerializer, RatingSerializer
from games.models import Game, Rating


# ------------>
# !!! Bad implementation with hard coding RatingSerializer, rework later
#     (try to auto create Rating instance on Game.objects.create?) !!!
# If cant find a solution using the method above, try to add a function to the utils that makes ratings inside game?
# ------------>
class SaleSerializer(serializers.ModelSerializer):
    game = GameSerializer(many=False)

    def create(self, validated_data):
        rating_data = validated_data['game'].pop('rating')
        rating_instance = Rating.objects.create(**rating_data)

        game_data = validated_data.pop('game')
        game_instance = Game.objects.create(**game_data, rating=rating_instance)

        sale_instance = Sale.objects.create(**validated_data, game=game_instance)

        return sale_instance

    class Meta:
        model = Sale
        fields = ['game', 'NA_sales', 'EU_sales', 'JP_sales', 'other_sales', 'global_sales']
