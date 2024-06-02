from django.shortcuts import HttpResponse, render

# Create your views here.
def home(request):
    return render(request, "home.html")

def game(request):
    return render(request, "game.html")

def play(request):
    return render(request, "pages/play.html")
