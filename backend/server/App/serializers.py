from rest_framework import serializers
from .models import Shop, PersonalData, HistoryData

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ("id","name","quantity","location", "opening_time", "img_url", "num_fb","genre", "explanation", "price")

class PersonalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalData
        fields = ("id", "user_id", "proper_quantity", "height", "weight", "birthday", "gender")

class RecordDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryData
        fields = ("id","date","user_id","shop_id","shop_name", "quantity","feedback","appetite")