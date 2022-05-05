from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from ..models import Profile
from .serializers import ProfileSerializer


class ProfileDetailAPIView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, username, format=None):
        ...

    def put(self, request):
        ...




