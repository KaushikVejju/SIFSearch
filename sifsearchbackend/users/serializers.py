from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only':True} # prevents password from being part of the serialized output (security reasons)
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password', None) # removes password from the validation data
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password) # password hashing
        instance.save()
        return instance
