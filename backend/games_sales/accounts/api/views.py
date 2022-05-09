from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SignUpUserSerializer


class UserSignUpAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = SignUpUserSerializer(data=request.data)

        if serializer.is_valid():
            new_user = serializer.save()
            if new_user:
                data = serializer.data
                return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
