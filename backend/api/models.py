from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    def __str__(self):
        return self.username

# This is the model for the notes
class Note(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True, related_name='notes')
    title = models.CharField(max_length=100, null=True, blank=True)
    audio_file = models.FileField(upload_to='audio/', null=True, blank=True)  
    body = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False)

# This is the string representation of the object
    def __str__(self):
        return self.title
    

