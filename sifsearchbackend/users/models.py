from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True, null=True) # prevents duplicative emails
    USERNAME_FIELD = 'email' 
    username = None
    REQUIRED_FIELDS = []
