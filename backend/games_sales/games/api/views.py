from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ..models import Game, Rating
from .serializers import (
    GameSerializer,
    # GameGetSerializer,
    # GamePostPutSerializer,
    RatingSerializer
)


# class GameListCreateAPIView(ListCreateAPIView):
#     queryset = Game.objects.all()
#     permission_classes = (IsAuthenticated, )
#     serializer_class = GameGetSerializer
#     lookup_field = 'uuid'
#
#
# class GameRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
#     queryset = Game.objects.all()
#     permission_classes = (IsAuthenticated, )
#     serializer_class = GameGetSerializer
#     lookup_field = 'uuid'


class RatingListCreateAPIView(ListCreateAPIView):
    queryset = Rating.objects.all()
    permission_classes = (IsAuthenticated, )
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
    def put(self, request, *args, **kwargs):
        game = get_object_or_404(Game, uuid=request.data['uuid'])
        return Response(GameSerializer(game).data)

    def delete(self):
        ...
