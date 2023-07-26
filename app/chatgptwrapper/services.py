from django.contrib.auth.models import User

from core.models import Theme, ThemeMetadata, Question, Answer
from chatgptwrapper.serializers import ThemeSerializers, ThemeMetadataSerializers, AnswerSerializers, UserSerializers

class UserService:

    @staticmethod
    def get_all_users():
        users = User.objects.all().filter(is_staff = False)
        
        serializersUser = UserSerializers(users, many = True)
        return serializersUser.data

    @staticmethod
    def get_user_by_id(primary_key):
        try:
            user = User.objects.get(id = primary_key)
        except User.DoesNotExist:
            return None

        serializersUser = UserSerializers(user)
        return serializersUser.data


class ThemeService:

    @staticmethod
    def get_theme_by_id(primary_key):
        try:
            theme = Theme.objects.get(id = primary_key)
        except Theme.DoesNotExist:
            return None

        serializersTheme = ThemeSerializers(theme)
        return serializersTheme.data

    @staticmethod
    def get_theme():
        theme = Theme.objects.all()

        serializersTheme = ThemeSerializers(theme, many = True)
        return serializersTheme.data


class ThemeMetadataService:

    @staticmethod
    def get_theme_metadata_by_theme(theme):
        try:
            theme_metadata = ThemeMetadata.objects.all().filter(theme = theme)
        except ThemeMetadata.DoesNotExist:
            return None

        serializersThemeMetadata = ThemeMetadataSerializers(theme_metadata, many = True)
        return serializersThemeMetadata.data


class AnswerService:

    @staticmethod
    def get_all_question_from_user(user):
        try:
            user_questions = Question.objects.all().filter(user = user)
            user_answers = Answer.objects.all().filter(question__in = user_questions)
        except Question.DoesNotExist or Answer.DoesNotExist:
            return None

        serializersAnswer = AnswerSerializers(user_answers, many = True)
        return serializersAnswer.data






