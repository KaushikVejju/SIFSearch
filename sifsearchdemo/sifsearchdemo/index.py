# index.py -> register the models we created in Django to Algolia

import algoliasearch_django as algoliasearch

from .models import SearchEntry, NotebookEntry, CodeBlockEntry

algoliasearch.register(SearchEntry)
algoliasearch.register(CodeBlockEntry)

