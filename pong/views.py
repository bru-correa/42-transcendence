from django.shortcuts import HttpResponse, render

# Create your views here.
def game(request):
    return render(request, "pages/game.html")

def home(request):
    return render(request, "pages/home.html")
