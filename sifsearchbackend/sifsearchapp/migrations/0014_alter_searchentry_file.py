# Generated by Django 5.0.1 on 2024-01-09 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sifsearchapp', '0013_searchentry_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='searchentry',
            name='file',
            field=models.FileField(null=True, upload_to='static'),
        ),
    ]
