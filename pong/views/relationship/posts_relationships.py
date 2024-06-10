from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from pong.models import Relationship, User
from .queries_relationship import *

# TODO
# cancel_friend_request
# accept_friend_request
# deny_friend_request

@login_required(login_url="/login")
def send_friend_request(request: HttpRequest):
	if request.method != "POST":
		return JsonResponse({'error': 'Invalid request method'}, status=400)

	friend_id = request.POST.get('friend_id')
	try:
		if friend_id is None:
			raise Exception("'name' is empty")
		if not isinstance(request.user, User):
			raise Exception("Authentication failed to provide a valid user")

		friend = User.objects.get(pk=friend_id)
		user = request.user
		is_friend = Relationship.objects.filter(
			Q(user1=user.pk,user2=friend.pk) | Q(user1=friend.pk,user2=user.pk),
			user1_is_friendly=True, user2_is_friendly=True
			).exists()
		if is_friend:
			raise Exception("Already friends")
		if get_sent_requests_qlist(user).filter(user2=friend.pk):
			raise Exception("A friend request was already sent")

		relationship = get_received_requests_qlist(user).filter(user1=friend.pk)
		if relationship.exists():
			friendship = Relationship.objects.get(user1=friend.pk, user2=user.pk)
			friendship.user2_is_friendly = True
		else:
			friendship = Relationship(user1=user, user2=friend)
		friendship.save()

	except Exception as e:
		return JsonResponse({
			'success': False,
			'message': f'{e}'
		}, status=400)

	return JsonResponse({
	'success': True,
	'message': 'Friend request sent'
	})
