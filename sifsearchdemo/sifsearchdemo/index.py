# index.py

import algoliasearch_django as algoliasearch

from .models import SearchEntry

algoliasearch.register(SearchEntry)

