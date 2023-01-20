from django.http import JsonResponse
from django.shortcuts import render
from .models import SearchEntry, Tag
from .serializers import EntrySerializer,EntryFileSerializer, TagSerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import Tag
import algoliasearch_django as algoliasearch

def sif_search_home(request):
    currtags = Tag.objects.all().values()
    return render(request, 'home.html', {'currtags':currtags})

# This function is invoked when the user uploads an entry that contains a link.
@api_view(['POST'])
def add_entry_link(request):
    serializer = EntrySerializer(data=request.data)
    tag_serializer = TagSerializer(data=request.data)
    tag_name = request.POST.get('tag')

    if serializer.is_valid():
        # testing to see if this will work
        serializer.save()
        if tag_serializer.is_valid():
            try:
                tag_n = Tag.objects.get(tag=tag_name)
            except ObjectDoesNotExist:
                tag_serializer.save()
        algoliasearch.reindex_all(SearchEntry,) 
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# This function is invoked when the user uploads an entry that contains a file.
@api_view(['POST'])
def add_entry_file(request):
    serializer = EntryFileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        algoliasearch.reindex_all(SearchEntry,) 
    return Response(serializer.data, status=status.HTTP_201_CREATED)

