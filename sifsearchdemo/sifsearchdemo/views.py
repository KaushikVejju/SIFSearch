from django.http import JsonResponse
from django.shortcuts import render
from .models import SearchEntry, Tag, NotebookEntry, CodeBlockEntry
from .serializers import EntrySerializer,EntryFileSerializer, TagSerializer, NotebookSerializer, CodeBlockSerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import nbformat
import os
import json
from .models import Tag
import algoliasearch_django as algoliasearch

def sif_search_home(request):
    currtags = Tag.objects.all().values()
    algoliasearch.reindex_all(SearchEntry,) 
    return render(request, 'home.html', {'currtags':currtags})

def notebook_upload_form(request):
    return render(request, 'notebook_upload.html')

def extract_code_blocks(file_path):
    """
    Takes a file path for a jupyter notebook and
    extracts the blocks with code

    str -> [str]
    """
    code_blocks = []
    with open(file_path, 'rb') as f:
        nb = nbformat.read(f, nbformat.NO_CONVERT)
        cells = nb['cells']
        code_blocks = [cell['source'] for cell in cells if cell['cell_type'] == 'code']
    return code_blocks

def serialize_code_blocks(code_blocks, notebook_name="n/a"):
    """
    Uses the codeblock serializer to record in the database
    the code blocks
    TODO: add inference functionality

    [str] -> None
    """
    for block in code_blocks:
        codeblock_data = {}
        codeblock_data["code"] = block
        codeblock_data["explanation"] = "Placeholder"
        codeblock_data["notebook"] = notebook_name
        codeblock_serializer = CodeBlockSerializer(data=codeblock_data)
        if codeblock_serializer.is_valid():
            codeblock_serializer.save()

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
                if (tag_name != "Code Repositories" and tag_name != "News Articles" and 
                    tag_name != "Research & Trading Strategies" and tag_name != "Random Stuff"
                    and tag_name != "SIF Related"):
                    tag_serializer.save()
        algoliasearch.reindex_all(SearchEntry,) 
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# This function is invoked when the user uploads an entry that contains a file.
@api_view(['POST'])
def add_entry_file(request):
    #TODO: replace below with os library functions (security)
    serializer = EntryFileSerializer(data=request.data)
    file_name = request.POST.get("file_name")
    file_name = os.path.join("static", file_name.split("\\")[2])
    file_type = file_name.split(".")[1]
    # TODO: open notebook file and parse code blocks
    print(file_name)
    print(file_type)
    
    tag_serializer = TagSerializer(data=request.data)
    tag_name = request.POST.get('tag')

    if serializer.is_valid():
        serializer.save()
        if file_type == "ipynb":
            code_blocks = extract_code_blocks(file_name)
            serialize_code_blocks(code_blocks, notebook_name=file_name.split(".")[0])
        if tag_serializer.is_valid():
            try:
                tag_n = Tag.objects.get(tag=tag_name)
            # make sure that the tag the user added is not one of the original tags (i need to change this code)
            except ObjectDoesNotExist:
                if (tag_name != "Code Repositories" and tag_name != "News Articles" and 
                    tag_name != "Research & Trading Strategies" and tag_name != "Random Stuff"
                    and tag_name != "SIF Related"):
                    tag_serializer.save()
        algoliasearch.reindex_all(SearchEntry,) 
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# This function is invoked when the user updates an entry
@api_view(['PUT'])
def update_entry(request):
    entry_name = request.POST.get('name')
    entry_obj = SearchEntry.objects.get(name=entry_name) # search for the original entry using the name
    # modify the name and description
    entry_obj.name = request.POST.get('new-name')
    entry_obj.description = request.POST.get('new-description')
    entry_obj.save() # saving the changes

    return Response(status=status.HTTP_201_CREATED)


# function for deleting a SearchEntry
@api_view(['DELETE'])
def delete_entry(request):
    entry_name = request.POST.get('name')
    SearchEntry.objects.filter(name = entry_name).delete()
    return Response(status=status.HTTP_201_CREATED)

