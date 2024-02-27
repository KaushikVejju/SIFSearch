from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    password = models.CharField(max_length=255)
    username = models.EmailField(unique=True, null=True)
    USERNAME_FIELD = 'username' 
    REQUIRED_FIELDS = []
