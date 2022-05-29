from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404
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
        data = {'message': ''}

        serializer = UserSignUpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            user = get_object_or_404(Account, email=serializer.data['email'])
            token = default_token_generator.make_token(user)

            current_site = get_current_site(request).domain
            relative_link = reverse('account_confirm_email')
            abs_url = f'http://{current_site+relative_link}?token={token}&email={user.email}'
            email_body = f'Hi {user.username}, Use the link below to confirm your email\n' \
                         f'{abs_url}'

            email_data = {
                'email_body': email_body,
                'email_subject': 'Confirm your email',
                'to_email': user.email
            }
            send_email(email_data)

            data['message'] = 'Confirmation link has been sent to your email.'
            return Response(data, status=status.HTTP_201_CREATED)

        # data['message'] = serializer.errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserConfirmEmailAPIView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request):
        data = {'message': ''}

        token = request.GET.get('token')
        email = request.GET.get('email')

        user = get_object_or_404(Account, email=email)

        if default_token_generator.check_token(user, token):
            if not user.is_verified:
                user.is_active = True
                user.is_verified = True
                user.save()

                data['message'] = 'Email has successfully been confirmed.'
                return Response(data, status=status.HTTP_200_OK)

            data['message'] = 'Email has already been verified.'
            return Response(data, status=status.HTTP_200_OK)

        data['message'] = 'Token has expired.'
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
