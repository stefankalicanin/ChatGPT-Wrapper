from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
import json
import requests

from chatgptwrapper.services import UserService, ThemeService, ThemeMetadataService, AnswerService
from core.models import Question, Theme, Answer

@api_view(['GET'])
def get_hello_world(request):
    return Response("Zdravo Stefane!") 

@api_view(['GET'])
def all_users(request):
    return Response(UserService.get_all_users())

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_question(request):
   data = json.loads(request.body)
 
   question = Question (
    content = data ['content'],
    theme = Theme.objects.get(id = data['id_thema']),
    user = User.objects.get(id = data['id_user'])
   )

   theme_metadata = ThemeMetadataService.get_theme_metadata_by_theme(question.theme)
   theme_metadata_json  = json.dumps(theme_metadata)

   response = requests.get('http://host.docker.internal:3500/question', 
        params = 
        {
            "question" : data['content'], 
            "theme" : question.theme, 
            "theme_metadata" : theme_metadata_json
        })
   content = response.json()

   answer = Answer (
    content = content["content"],
    question = question
   )
   
   question.save()
   answer.save()
   
   return Response(response.json(), status = status.HTTP_201_CREATED)

@api_view(['GET'])
def all_theme(request):
   return Response(ThemeService.get_theme())

@api_view(['GET'])
def all_questions_from_user(request, id):
    return Response(AnswerService.get_all_question_from_user(id))


