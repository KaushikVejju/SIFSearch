from django.contrib import admin
from .models import SearchEntry,Tag, NotebookEntry, CodeBlockEntry # . refers to the current directory

# register both of the models
admin.site.register(SearchEntry)
admin.site.register(Tag)
admin.site.register(CodeBlockEntry)