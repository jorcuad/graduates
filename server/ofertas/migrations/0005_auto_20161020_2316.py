# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-20 23:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ofertas', '0004_offer_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offer',
            name='time',
            field=models.CharField(max_length=25, null=True),
        ),
    ]
