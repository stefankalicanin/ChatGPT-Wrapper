# Generated by Django 3.2.18 on 2023-04-04 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='answerTime',
            field=models.TimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='questionTime',
            field=models.TimeField(auto_now_add=True),
        ),
    ]