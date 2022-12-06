from django.http import HttpResponse
from django.shortcuts import render
def sif_search_home(request):
    return render(request, 'home.html')
