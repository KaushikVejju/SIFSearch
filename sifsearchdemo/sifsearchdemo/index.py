# index.py

from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from .models import SearchEntry, CodeBlockEntry

@register(SearchEntry)
class SearchEntryIndex(AlgoliaIndex):
    settings = {'searchableAttributes': ['name', 'description', 'link', 'file', 'tag']}
    index_name = 'SearchEntry'

@register(CodeBlockEntry)
class CodeBlockEntryIndex(AlgoliaIndex):
    settings = {'searchableAttributes': ['code', 'explanation', 'notebook']}
    index_name = 'CodeBlockEntry'