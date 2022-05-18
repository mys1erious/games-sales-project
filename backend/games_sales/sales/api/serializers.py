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
