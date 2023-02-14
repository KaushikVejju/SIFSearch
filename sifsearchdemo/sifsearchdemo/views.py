from django.http import JsonResponse
from django.shortcuts import render,redirect
from .models import SearchEntry, Tag
from .serializers import EntrySerializer,EntryFileSerializer, TagSerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import Tag
import algoliasearch_django as algoliasearch
from .forms import NewUserForm
from django.contrib.auth import login
from django.contrib import messages
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import logout


def sif_search_home(request):
    if not request.user.is_authenticated:
        return redirect("/login")
    currtags = Tag.objects.all().values()
    algoliasearch.reindex_all(SearchEntry,) 
    return render(request, 'home.html', {'currtags':currtags})

# This function is invoked when the user uploads an entry that contains a link.
@api_view(['POST'])
def add_entry_link(request):
    serializer = EntrySerializer(data=request.data)
    tag_serializer = TagSerializer(data=request.data)
    tag_name = request.POST.get('tag')


    '''
    basic request (raw)--> {
        name: value,
        tag: value
    }
    '''

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
    serializer = EntryFileSerializer(data=request.data)
    tag_serializer = TagSerializer(data=request.data)
    tag_name = request.POST.get('tag')

    if serializer.is_valid():
        serializer.save()
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
    user_name = request.POST.get('user')
    entry_obj = SearchEntry.objects.get(name=entry_name) # search for the original entry using the name
    print(entry_obj.user, user_name)
    if entry_obj.user == user_name:
    # modify the name and description
        entry_obj.name = request.POST.get('new-name')
        entry_obj.description = request.POST.get('new-description')
        entry_obj.save() # saving the changes
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


# function for deleting a SearchEntry
@api_view(['DELETE'])
def delete_entry(request):
    entry_name = request.POST.get('name')
    user_name = request.POST.get('user')
    if SearchEntry.objects.get(name=entry_name).user == user_name:
        SearchEntry.objects.filter(name = entry_name).delete()
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_406_NOT_ACCEPTABLE)



# function for registering a new user into the site
def register_request(request):
	if request.method == "POST":
		form = NewUserForm(request.POST)
		if form.is_valid():
			user = form.save()
			login(request, user)
			messages.success(request, "Registration successful." )
			return redirect("/login")
		messages.error(request, "Unsuccessful registration. Invalid information.")
	form = NewUserForm()
	return render (request=request, template_name="register.html", context={"register_form":form})

def login_request(request):
	if request.method == "POST":
		form = AuthenticationForm(request, data=request.POST)
		if form.is_valid():
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			user = authenticate(username=username, password=password)
			if user is not None:
				login(request, user)
				messages.info(request, "You are now logged in as {username}.")
				return redirect("/")
			else:
				messages.error(request,"Invalid username or password.")
		else:
			messages.error(request,"Invalid username or password.")
	form = AuthenticationForm()
	return render(request=request, template_name="login.html", context={"login_form":form})
def logout_request(request):
    logout(request)
    messages.info(request, "Logged out successfully!")
    return redirect("login")