# Generated by Django 5.0.1 on 2024-01-08 21:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sifsearchapp', '0005_alter_searchentry_link_alter_searchentry_tags'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='searchentry',
            name='file',
        ),
    ]
