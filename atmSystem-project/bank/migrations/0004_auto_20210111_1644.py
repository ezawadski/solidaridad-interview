# Generated by Django 3.1.3 on 2021-01-11 16:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0003_transaction_transactiontype'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='owner',
            new_name='name',
        ),
    ]
