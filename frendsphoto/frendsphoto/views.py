from django.conf import settings
from django.shortcuts import render, render_to_response
from django.http import HttpResponse
import urllib.request

# Create your views here.
def home(request):
    return render_to_response('main.html')

def info(request, application_key, access_token, session_secret_key, sig):
    path = 'http://api.odnoklassniki.ru/fb.do?application_key=' + application_key + '&method=users.getCurrentUser&access_token=' + access_token + '&sig=' + sig;
    response = urllib.request.urlopen(path)
    return HttpResponse(response.read())

def photo(request):
    return render_to_response('main.html')

def callback(request):
    return render_to_response('callback.html')