from django.db import models
from django.utils import timezone
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
from django.conf import settings

def file_size_validator(file):
    if file.size > settings.MAX_UPLOAD_SIZE:
        raise ValidationError('File size exceeds the 5 MiB limit.')

class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()

class User(models.Model):
	id = models.UUIDField(primary_key=True, auto_created=True)
	intra_name = models.CharField(max_length=150, unique=True, blank=False, null=False)
	display_name = models.CharField(max_length=150, default=intra_name)

	avatar = models.FileField(
        blank=True,
        null=True,
        default='default_avatar.svg',
        validators=[
            FileExtensionValidator(allowed_extensions=['svg', 'png', 'jpg', 'jpeg']),
            file_size_validator
		])

	session_key = models.CharField(blank=True, null=True, max_length=40)

	created_at = models.DateTimeField(default=timezone.now)
	updated_at = AutoDateTimeField(default=timezone.now)
	last_login = models.DateTimeField(null=True)

# 1v1 Games Match History
class MatchHistory(models.Model):
    user_id = models.ForeignKey(User, related_name='matches', on_delete=models.CASCADE)
    user_score = models.IntegerField(default=0)

    opponent_display_name = models.CharField(max_length=150, blank=False, null=False)
    opponent_score = models.IntegerField(default=0)

    match_result = models.BooleanField(default=False)	# True: Victory, False: Defeat

    finished_at = models.DateTimeField(default=timezone.now)
