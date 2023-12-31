# Generated by Django 4.2.5 on 2023-09-14 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("App", "0008_historydata_date_alter_historydata_shop_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="personaldata",
            name="birthday",
            field=models.DateTimeField(default="1999-01-01"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="personaldata",
            name="gender",
            field=models.CharField(
                choices=[("male", "Male"), ("female", "Female"), ("other", "Other")],
                default="male",
                max_length=10,
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="personaldata",
            name="height",
            field=models.IntegerField(blank=True, default=180),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="personaldata",
            name="weight",
            field=models.IntegerField(blank=True, default=70),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="shop",
            name="explanation",
            field=models.CharField(default="test", max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="shop",
            name="opening_time",
            field=models.CharField(default="7:00~19:00", max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="shop",
            name="price",
            field=models.IntegerField(blank=True, default=1000),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="historydata",
            name="quantity",
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name="historydata",
            name="shop_id",
            field=models.IntegerField(blank=True),
        ),
    ]
