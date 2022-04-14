from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ..models import Game, Rating
from .serializers import (
    GameSerializer,
    RatingSerializer
)


class RatingListCreateAPIView(ListCreateAPIView):
    queryset = Rating.objects.all()
    # permission_classes = (IsAuthenticated, )
    serializer_class = RatingSerializer


class GameListAPIView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class GameDetailAPIView(APIView):
    permission_classes = (IsAuthenticated, )

    def put(self, request, uuid, format=None):
        game = get_object_or_404(Game, uuid=uuid)
        serializer = GameSerializer(game, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uuid, format=None):
        game = get_object_or_404(Game, uuid=uuid)
        game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
