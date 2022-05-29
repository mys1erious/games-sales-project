from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError

from rest_framework import serializers

from accounts.models import Account


class UserSignUpSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(label="Confirm Password", write_only=True)

    class Meta:
        model = Account
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)

        # !!! Change to another one when done testing !!!
        # instance = self.Meta.model(**validated_data)
        instance = self.Meta.model(**validated_data, is_active=True, is_verified=True)
        instance.set_password(password)
        instance.save()
        return instance

    def validate(self, attrs):
        errors = {
            'password': []
        }

        username = attrs.get('username', None)
        email = attrs.get('email', None)
        password = attrs.get('password', None)
        password2 = attrs.pop('password2', None)

        instance = self.Meta.model(username=username, email=email)

        try:
            password_validation.validate_password(password=password, user=instance)
        except ValidationError as e:
            errors['password'] = list(e.messages)

        if password != password2:
            errors['password'].append('Password and Confirmation Password must match.')

        if errors['password']:
            raise ValidationError(errors)

        return attrs
