# Generated by Django 3.1.3 on 2021-01-09 16:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Atm',
            fields=[
                ('atm_id', models.AutoField(primary_key=True, serialize=False)),
                ('location', models.CharField(max_length=128)),
                ('qty_note_1', models.PositiveIntegerField(default=0)),
                ('qty_note_2', models.PositiveIntegerField(default=0)),
                ('qty_note_5', models.PositiveIntegerField(default=0)),
                ('qty_note_10', models.PositiveIntegerField(default=0)),
                ('qty_note_20', models.PositiveIntegerField(default=0)),
                ('qty_note_50', models.PositiveIntegerField(default=0)),
                ('qty_note_100', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Account',
            fields=[
                ('account_id', models.AutoField(primary_key=True, serialize=False)),
                ('balance', models.PositiveIntegerField(default=0)),
                ('owner', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
