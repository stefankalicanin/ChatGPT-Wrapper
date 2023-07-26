from rest_framework import serializers
from django.contrib.auth.models import User

from core.models import Theme, Answer, Question, ThemeMetadata

class UserSerializers(serializers.ModelSerializer):


    class Meta:
        model = User
        fields = ['id','username']


class ThemeSerializers(serializers.ModelSerializer):


    class Meta:
        model = Theme
        fields = ['id', 'name']


class QuestionSerializers(serializers.ModelSerializer):

    theme = ThemeSerializers()
    user = UserSerializers()


    class Meta:
        model = Question
        fields = ['id', 'content', 'theme', 'user']


class AnswerSerializers(serializers.ModelSerializer):

    question = QuestionSerializers()


    class Meta:
        model = Answer
        fields = ['content', 'question']


class ThemeMetadataSerializers(serializers.ModelSerializer):


    class Meta:
        model = ThemeMetadata
        fields = ['example', 'description']

