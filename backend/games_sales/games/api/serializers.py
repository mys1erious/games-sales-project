from rest_framework import serializers

from ..models import Game, Rating


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['critic_score', 'critic_count', 'user_score', 'user_count']


class GameSerializer(serializers.ModelSerializer):
    rating = RatingSerializer(many=False)

    def create(self, validated_data):
        rating_data = validated_data.pop('rating')
        rating_instance = Rating.objects.create(**rating_data)
        game_instance = Game.objects.create(**validated_data, rating=rating_instance)
        return game_instance

    class Meta:
        model = Game
        fields = [
            'uuid', 'name', 'platform', 'publisher', 'developer',
            'genre', 'year_of_release', 'esrb_rating', 'rating'
        ]


# Just instance sample
# {
#     "name": "name_test6",
#     "platform": "",
#     "publisher": "",
#     "developer": "",
#     "genre": "",
#     "year_of_release": null,
#     "esrb_rating": "",
#     "rating": {
#         "critic_score": 1.0,
#         "critic_count": 2.0,
#         "user_score": 4.0,
#         "user_count": 10.0
#     }
# }
