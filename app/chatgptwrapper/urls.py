from django.urls import path
from chatgptwrapper import views

urlpatterns = [
    path('helloworld', views.get_hello_world, name = 'helloworld'),
    path('users', views.all_users, name = 'all users'),
    path('answer', views.create_question, name = 'create question'),
    path('themes', views.all_theme, name = 'all theme'),
    path('user/questions/<int:id>', views.all_questions_from_user, name = 'all questions from specific user')
]