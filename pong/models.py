from django.db import models
from django.utils import timezone
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
from django.conf import settings
import uuid
from django.contrib.auth.models import AbstractUser

def file_size_validator(file):
    if file.size > settings.MAX_UPLOAD_SIZE:
        raise ValidationError('File size exceeds the 5 MiB limit.')

class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()

class User(AbstractUser):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	intra_name = models.CharField(max_length=150, unique=True, blank=False, null=False)
	USERNAME_FIELD = "intra_name"
	display_name = models.CharField(max_length=150, unique=False)
	def save(self, *args, **kwargs): # On creation, display_name = intra_name
		if not self.display_name:
			self.display_name = self.intra_name
		super().save(*args, **kwargs)

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

	#? Is this field necessary?
	last_login = models.DateTimeField(null=True)

	def __str__(self):
		return f"{self.id}"

# 1v1 Games Match History
class MatchHistory(models.Model):
    user = models.ForeignKey(User, related_name='matches', on_delete=models.CASCADE)
    user_score = models.IntegerField(default=0)

    opponent_display_name = models.CharField(max_length=150, blank=False, null=False)
    opponent_score = models.IntegerField(default=0)

    match_result = models.BooleanField(default=False)	# True: Victory, False: Defeat

    finished_at = models.DateTimeField(default=timezone.now)

class Relationship(models.Model):
	user1 = models.ForeignKey(User, related_name='friendship_from_user1', on_delete=models.CASCADE)
	user2 = models.ForeignKey(User, related_name='friendship_from_user2', on_delete=models.CASCADE)

	user1_is_friendly = models.BooleanField(default=False)
	user2_is_friendly = models.BooleanField(default=False)
	def is_friendship(self):
		return self.user1_is_friendly and self.user2_is_friendly

	class Meta:
		constraints = [
            models.UniqueConstraint(fields=['user1', 'user2'], name='unique_relationship')
        ]
	def __str__(self):
		return f"{self.user1.display_name} - {self.user2.display_name}"
