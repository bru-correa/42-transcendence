from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, JsonResponse
from django.shortcuts import render
from pong.models import User
from .queries_relationship import *

@login_required(login_url="/login")
def get_relationships(request: HttpRequest):
	if request.method != "GET":
		return JsonResponse({'error': 'Invalid request method'}, status=400)
	if not isinstance(request.user, User):
		return JsonResponse({
			'error': 'Authentication failed to provide a valid user'
			}, status=403)

	context = get_relationships_context(request.user)
	# TODO render page/section with context
	# return render(request, '', context=context)
	return JsonResponse({'yay': 'true'}, status=200)

def get_relationships_context(user: User):
	friends = get_friends_list(user)
	friends.sort(key=lambda usr: usr.display_name.lower())

	not_friends = get_not_friends_qlist(user)

	sent_requests = [
		User.objects.get(pk=user_id) for user_id in list(get_sent_requests_qlist(user))
		]

	received_requests = [
		User.objects.get(pk=user_id) for user_id in list(get_received_requests_qlist(user))
		]

	context = {
		'friends': friends,
		'not_friends': not_friends,
		'sent_requests': sent_requests,
		'received_requests': received_requests
	}
	return context
