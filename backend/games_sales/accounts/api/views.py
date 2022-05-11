from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import (
    UserSignUpSerializer,
)
from ..models import Account
from ..utils import send_email


class UserSignUpAPIView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, format=None):
        user = request.data
        serializer = UserSignUpSerializer(data=user)

        if serializer.is_valid():
            serializer.save()

            user = Account.objects.get(email=serializer.data['email'])
            token = default_token_generator.make_token(user)

            current_site = get_current_site(request).domain
            relative_link = reverse('account_confirm_email')
            abs_url = f'http://{current_site+relative_link}?token={token}&email={user.email}'
            email_body = f'Hi {user.username}, Use the link below to confirm your email\n' \
                         f'{abs_url}'

            data = {
                'email_body': email_body,
                'email_subject': 'Confirm your email',
                'to_email': user.email
            }
            send_email(data)

            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserConfirmEmailAPIView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request):
        context = {}

        token = request.GET.get('token')
        email = request.GET.get('email')

        try:
            user = Account.objects.get(email=email)
        except(TypeError, ValueError, OverflowError):
            user = None

        if user is None:
            context['response'] = 'Error'
            context['error_message'] = 'User not found'
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        if default_token_generator.check_token(user, token):
            if not user.is_verified:
                user.is_active = True
                user.is_verified = True
                user.save()

                context['response'] = 'Email has successfully been confirmed'
                return Response(context, status=status.HTTP_200_OK)

            context['response'] = 'Email has already been verified'
            return Response(context, status=status.HTTP_200_OK)

        context['response'] = 'Error'
        context['error_message'] = 'Wrong token'
        return Response(context, status=status.HTTP_400_BAD_REQUEST)
