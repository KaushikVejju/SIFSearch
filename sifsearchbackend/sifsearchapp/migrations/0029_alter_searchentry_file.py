# Generated by Django 5.0.1 on 2024-01-10 03:54

import sifsearchapp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sifsearchapp', '0028_alter_searchentry_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='searchentry',
            name='file',
            field=models.FileField(default='', upload_to=sifsearchapp.models.upload_to),
        ),
    ]
