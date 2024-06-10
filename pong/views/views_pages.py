from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .relationship.views_relationships import get_relationships_context
from pong.models import MatchHistory, User

@login_required(login_url="/login")
def get_home_page(request):
	if not isinstance(request.user, User):
		raise Exception()

	try:
		context = get_relationships_context(request.user)
	except Exception as e:
		print("Error:", e)
	return render(request, "pages/home.html", context=context)
	# return render(request, "pages/home.html")

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

# TODO Erase
@login_required(login_url="/login")
def get_tests_page(request):
    return render(request, "pages/tests.html")
