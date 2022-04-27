from rest_framework import serializers

from ..models import Sale
from games.api.serializers import GameSerializer


class SaleSerializer(serializers.ModelSerializer):
    game = GameSerializer(many=False)

    def create(self, validated_data):
        sale_instance = self.Meta.model.objects.create(**validated_data)
        return sale_instance

    class Meta:
        model = Sale
        fields = ['uuid', 'game', 'NA_sales', 'EU_sales', 'JP_sales', 'other_sales', 'global_sales']


# Instance sample
# {
#         "game": {
#             "name": "test1",
#             "platform": "",
#             "publisher": "",
#             "developer": "",
#             "genre": "",
#             "year_of_release": null,
#             "esrb_rating": "",
#             "rating": {
#                 "critic_score": 1.0,
#                 "critic_count": 2.0,
#                 "user_score": 3.0,
#                 "user_count": 4.0
#             }
#         },
#         "NA_sales": 10.0,
#         "EU_sales": 20.0,
#         "JP_sales": 30.0,
#         "other_sales": 40.0,
#         "global_sales": 100.0
#     }