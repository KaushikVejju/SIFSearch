from django.contrib import admin
from .models import SearchEntry # . refers to the current directory

admin.site.register(SearchEntry)