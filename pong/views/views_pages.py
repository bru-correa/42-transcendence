from django.shortcuts import render

# Create your views here.
def get_home_page(request):
    return render(request, "pages/home.html")

def get_login_page(request):
    return render(request, "pages/login.html")

def get_game_page(request):
    return render(request, "pages/game.html")

def get_social_page(request):
    return render(request, "pages/social.html")

def get_stats_page(request):
    return render(request, "pages/stats.html")

def get_tournament_page(request):
    return render(request, "pages/tournament.html")
