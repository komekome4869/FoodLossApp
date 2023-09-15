# Generated by Django 4.2.5 on 2023-09-14 00:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("App", "0007_shop_img_url"),
    ]

    operations = [
        migrations.AddField(
            model_name="historydata",
            name="date",
            field=models.DateTimeField(auto_now_add=True, default="1999-01-01"),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="historydata", name="shop_id", field=models.IntegerField(),
        ),
    ]