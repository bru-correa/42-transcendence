from django.contrib.auth.backends import BaseBackend
from .models import User

class UserBackend(BaseBackend):
	def authenticate(self, request, user) -> User | None:
		session_key = request.session.session_key
		if not session_key:
			request.session.create()

		try:
			auth_user = User.objects.get(intra_name=user)
		except User.DoesNotExist:
			auth_user = User(intra_name=user)
			auth_user.save()
		except Exception as e:
			print(f"User authentication error: {e}")
			return None

		auth_user.session_key = session_key
		auth_user.save()
		return auth_user

	def get_user(self, user_id) -> User | None:
		try:
			return User.objects.get(pk=user_id)
		except Exception as e:
			print(f"Auth get_user error{e}")
			return None
