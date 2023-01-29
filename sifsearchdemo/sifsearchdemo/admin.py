from django.contrib import admin
from .models import SearchEntry,Tag # . refers to the current directory

# register both of the models
admin.site.register(SearchEntry)
admin.site.register(Tag)