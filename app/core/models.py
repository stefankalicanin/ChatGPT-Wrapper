from django.db import models
from django.contrib.auth.models import User


class Theme(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self) -> str:
        return self.name


class Question(models.Model):
    content = models.TextField()
    questionTime = models.TimeField(auto_now_add=True)
    theme = models.ForeignKey(
        Theme,
        on_delete = models.CASCADE
    )
    user = models.ForeignKey(
        User,
        on_delete = models.CASCADE
    )

    def __str__(self) -> str:
        return self.content


class Answer(models.Model):
    content = models.TextField()
    answerTime = models.TimeField(auto_now_add=True)
    question = models.ForeignKey (
        Question,
        on_delete = models.CASCADE
    )

    def __str__(self) -> str:
        return self.content 


class ThemeMetadata(models.Model):
    example = models.TextField() 
    description = models.TextField()
    theme = models.ForeignKey(
        Theme,
        on_delete = models.CASCADE
    )

    def __str__(self) -> str:
        return self.example + self.description
    
