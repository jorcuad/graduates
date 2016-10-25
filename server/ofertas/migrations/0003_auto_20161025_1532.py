# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-25 15:32
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ofertas', '0002_auto_20161024_1457'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favorite',
            name='offer',
        ),
        migrations.RemoveField(
            model_name='favorite',
            name='user',
        ),
        migrations.AddField(
            model_name='offer',
            name='favorites',
            field=models.ManyToManyField(related_name='users', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Favorite',
        ),
    ]
