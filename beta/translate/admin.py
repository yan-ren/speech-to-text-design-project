from django.contrib import admin
from .models import Srt
from .models import Audio
from .models import Video

# Register your models here.
admin.site.register(Srt)
admin.site.register(Audio)
admin.site.register(Video)

