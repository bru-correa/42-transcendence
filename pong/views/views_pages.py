from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required(login_url="/login")
def get_home_page(request):
    if request.headers.get('X-Custom-Header') != 'self':
        return render(request, "pages/home.html")
    return render(request, "sections/home.html")

def get_login_page(request):
    if request.headers.get('X-Custom-Header') != 'self':
        return render(request, "pages/login.html")
    return render(request, "sections/login.html")

@login_required(login_url="/login")
def get_game_page(request):
    if request.headers.get('X-Custom-Header') != 'self':
        return render(request, "pages/game.html")
    return render(request, "sections/game.html")

@login_required(login_url="/login")
def get_social_page(request):
    if request.headers.get('X-Custom-Header') != 'self':
        return render(request, "pages/social.html")
    return render(request, "sections/social.html")

@login_required(login_url="/login")
def get_stats_page(request):
    if request.headers.get('X-Custom-Header') != 'self':
        return render(request, "pages/stats.html")
    return render(request, "sections/stats.html")

@login_required(login_url="/login")
def get_tournament_page(request):
    if request.headers.get('X-Custom-Header') != 'self':
        return render(request, "pages/tournament.html")
    return render(request, "sections/tournament.html")

@login_required(login_url="/login")
def get_tournament_form_page(request):
    if request.headers.get('X-Custom-Header') != 'self':
        return render(request, "pages/tournamentForm.html")
    return render(request, "sections/tournamentForm.html")

@login_required(login_url="/login")
def get_tournament_game_page(request):
    if request.headers.get('X-Custom-Header') != 'self':
        return render(request, "pages/tournamentGame.html")
    return render(request, "sections/tournamentGame.html")
