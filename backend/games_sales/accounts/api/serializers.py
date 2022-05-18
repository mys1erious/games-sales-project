from rest_framework import serializers

from accounts.models import Account


class UserSignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)

        # !!! Change to another one when done testing !!!
        # instance = self.Meta.model(**validated_data)
        instance = self.Meta.model(**validated_data, is_active=True, is_verified=True)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
