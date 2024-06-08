from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, JsonResponse
from pong.models import User

#TODO
# update avatar

def validate_name(name: str):
	if len(name) >= 20 or len(name) < 3:
		raise Exception('Display name must be between 3 and 20 characters long')
	if any(not c.isalnum() for c in name):
		raise Exception('Display name cannot include spaces or special characters')

@login_required(login_url="/login")
def update_display_name(request: HttpRequest) -> JsonResponse:
	if request.method != "POST":
		return JsonResponse({'error': 'Invalid request method'}, status=400)

	new_display_name = request.POST.get('name')
	try:
		if new_display_name is None:
			raise Exception("'name' is empty")
		validate_name(new_display_name)
		user: User = request.user
		user.display_name = new_display_name
		user.save()
	except Exception as e:
		return JsonResponse({
			'success': False,
			'message': f'{e}'
		}, status=400)

	return JsonResponse({
		'success': True,
		'message': f'User {request.user.intra_name} is now named {new_display_name}'
		})
