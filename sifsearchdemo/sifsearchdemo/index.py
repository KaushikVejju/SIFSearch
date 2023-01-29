# index.py -> register the models we created in Django to Algolia

import algoliasearch_django as algoliasearch

from .models import SearchEntry

algoliasearch.register(SearchEntry)

