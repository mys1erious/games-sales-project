from rest_framework import serializers

from ..models import Game, Rating


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'


class GameSerializer(serializers.ModelSerializer):
    rating = RatingSerializer(many=False)

    # REWORK TO CREATE WITH RATINGS
    def create(self, validated_data):
        rating_data = validated_data  # ['rating']
        rating = Rating.objects.create(rating_data)
        game = Game.objects.create(rating=rating)

        return game

    class Meta:
        model = Game
        fields = [
            'uuid', 'name', 'platform', 'publisher', 'developer',
            'genre', 'year_of_release', 'esrb_rating', 'rating'
        ]
