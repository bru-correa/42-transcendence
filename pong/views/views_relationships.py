from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.shortcuts import render
from pong.models import Relationship, User

# TODO
# send_friend_request
# cancel_friend_request
# accept_friend_request
# deny_friend_request

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
	friends1 = Relationship.objects.filter(user1=user,
		user1_is_friendly=True,
		user2_is_friendly=True
		).values_list('user2', flat=True)
	friends2 = Relationship.objects.filter(user2=user,
		user1_is_friendly=True,
		user2_is_friendly=True
		).values_list('user1', flat=True)

	friends = [
		User.objects.get(pk=friend_id) for friend_id in list(friends1) + list(friends2)
		]
	friends.sort(key=lambda usr: usr.display_name.lower())

	has_relationships = Relationship.objects.filter(
			Q(user1=user) | Q(user2=user)
		).exists()

	if has_relationships:
		not_friends = User.objects.exclude(
			Q(friendship_from_user1=user.pk) | Q(friendship_from_user2=user.pk)
			).order_by("display_name").values("id", "display_name", "avatar", "last_login")
	else:
		not_friends = User.objects.exclude(pk=user.pk)

	sent_requests = Relationship.objects.filter(
		user1=user,
		user1_is_friendly=True,
		user2_is_friendly=False
		).values()

	received_requests = Relationship.objects.filter(
		user2=user,
		user1_is_friendly=False,
		user2_is_friendly=True
		).values()

	context = {
		'friends': friends,
		'not_friends': not_friends,
		'sent_requests': sent_requests,
		'received_requests': received_requests
	}
	return context
