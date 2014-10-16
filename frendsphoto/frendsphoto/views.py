from django.conf import settings
from django.shortcuts import render, render_to_response

# Create your views here.
def home(request):
    return render_to_response('main.html')

def callback(request):
    return render_to_response('callback.html')