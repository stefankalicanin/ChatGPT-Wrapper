from django.contrib import admin
from .models import Question, Answer, Theme, ThemeMetadata

# Register your models here.
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Theme)
admin.site.register(ThemeMetadata)

