from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']

        # Hide password when returning the user
        extra_kwargs = {
            'password': {'write_only':True}
        }
    
    # hash the password
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password) # set_password() is provided by Django
        instance.save()
        return instance
