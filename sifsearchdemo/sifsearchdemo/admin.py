from django.contrib import admin
from .models import SearchEntry,Tag # . refers to the current directory

admin.site.register(SearchEntry)
admin.site.register(Tag)