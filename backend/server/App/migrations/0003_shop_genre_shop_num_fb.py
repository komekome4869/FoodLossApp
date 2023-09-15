# Generated by Django 4.2.5 on 2023-09-13 02:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0002_personaldata_alter_shop_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='shop',
            name='genre',
            field=models.CharField(default='chain', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='shop',
            name='num_fb',
            field=models.IntegerField(blank=True, default=5),
            preserve_default=False,
        ),
    ]