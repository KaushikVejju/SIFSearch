# Generated by Django 5.0.1 on 2024-03-22 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sifsearchapp', '0032_remove_searchentry_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='searchentry',
            name='user',
            field=models.CharField(default='', max_length=100),
        ),
    ]