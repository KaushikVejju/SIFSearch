from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse
from rest_framework.decorators import api_view
from .serializers import SearchEntrySerializer
from rest_framework.response import Response
from rest_framework import status
import algoliasearch_django as algoliasearch
from .models import SearchEntry
import pyrebase as pyrebase
import os

'''
- create a feature where we can see top news stories related to finance (associated with a ticker)
- user enters a ticker (we verify the list)
- if valid, we present the news (top 5 articles associated with it), from the news API
- this is a front-end feature
'''
@api_view(['POST'])
def upload(request):
    '''
    TO DO: change the request body so that it seperates the items in the strings

    '''
    serializer = SearchEntrySerializer(data=request.data)
    if serializer.is_valid():
        revised_tag_lst = serializer.validated_data['tags_test'][0].split(",")
        serializer.validated_data['tags_test'] = revised_tag_lst

        '''
        in the tags_set, there is one item stored. We need to break this item
        into a list based on the comma. This way we can retrieve the new values
        '''
        for item in serializer.validated_data['tags_test']:
            print(item)
        '''
        Handle the storage of files (via Firebase)
        '''
        if serializer.validated_data.get('file') is not None:
            firebase = pyrebase.initialize_app({
                "apiKey":  f"{os.getenv('FIREBASE_APIKEY')}",
                "authDomain": f"{os.getenv('FIREBASE_AUTHDOMAIN')}",
                "projectId": f"{os.getenv('FIREBASE_PROJECTID')}" ,
                "storageBucket":  f"{os.getenv('FIREBASE_STORAGEBUCKET')}",
                "messagingSenderId":f"{os.getenv('FIREBASE_MESSAGESENDERID')}",
                "appId": f"{os.getenv('FIREBASE_APPID')}",
                "measurementId": f"{os.getenv('FIREBASE_MEASUREMENTID')}",
                "databaseURL":""
            })
            storage = firebase.storage()
            file_instance = serializer.validated_data['file']
            storage.child(file_instance.name).put(serializer.validated_data['file'])
            file_link = f"https://storage.googleapis.com/{os.getenv('FIREBASE_STORAGEBUCKET')}/{file_instance.name}"
            serializer.validated_data['file'] = file_link

        serializer.save()


        
    algoliasearch.reindex_all(SearchEntry,) 
    return Response(serializer.data, status=status.HTTP_201_CREATED)