from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required(login_url="/login")
def get_home_page(request):
    return render(request, "pages/home.html")

def get_login_page(request):
    return render(request, "pages/login.html")

@login_required(login_url="/login")
def get_game_page(request):
    return render(request, "pages/game.html")

@login_required(login_url="/login")
def get_social_page(request):
    return render(request, "pages/social.html")

@login_required(login_url="/login")
def get_stats_page(request):
    return render(request, "pages/stats.html")

@login_required(login_url="/login")
def get_tournament_page(request):
    return render(request, "pages/tournament.html")

@login_required(login_url="/login")
def get_tournament_form_page(request):
    return render(request, "pages/tournamentForm.html")
