# Generated by Django 5.0.1 on 2024-01-08 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sifsearchapp', '0007_alter_searchentry_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='searchentry',
            name='tags',
            field=models.JSONField(default='None'),
        ),
    ]