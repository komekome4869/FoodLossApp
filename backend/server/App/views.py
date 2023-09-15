from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Shop, PersonalData, HistoryData
from .serializers import ShopSerializer, PersonalDataSerializer, RecordDataSerializer
from django.db.models import Avg
import json

# Create your views here.
class shopView(APIView):
    def get(self, request):
        
        ##personal data
        user_id = request.META.get("HTTP_USER_ID")
        personal_data = PersonalData.objects.filter(user_id=user_id)
        serializer_personal = PersonalDataSerializer(personal_data.first(), many=False)

        ## shop data
        shops = Shop.objects.all()
        serializer_shop = ShopSerializer(shops, many=True)

        ##　calculate average
        average_proper_quantity = PersonalData.objects.aggregate(Avg('proper_quantity'))
        average_value = average_proper_quantity['proper_quantity__avg']

        ## record data
        record_data = HistoryData.objects.filter(user_id=user_id)
        serializer_record = RecordDataSerializer(record_data, many=True)
        print(serializer_record.data)

        combined_data = {
            "shop_list":serializer_shop.data,
            "average_quantity":{
                "personal":serializer_personal.data.get("proper_quantity"),
                "general":average_value ,
            },
            "record_list":serializer_record.data,
        }
        

        return Response(combined_data, status=status.HTTP_200_OK)

class feedbackView(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)

            user_id = request.META.get("HTTP_USER_ID")

            shop_id = data.get("shop-id")
            feedback = data.get("feedback")
            appetite = data.get("appetite")
            print(shop_id)

            shops = Shop.objects.filter(id=shop_id).first()

            #フィードバック数を1増やす
            shops.num_fb = int(shops.num_fb)+1
            shops.save()

            personal_data = PersonalData.objects.filter(user_id=user_id).first()

            # 個人データの適正量の更新式
            r_fb=0.1
            r_ap=0.1
            personal_data.proper_quantity = (1-r_fb*(int(feedback)-3))*float(shops.quantity)*(1-r_ap*(int(appetite)-3))
            personal_data.save()

            #履歴の更新
            history_data = HistoryData(user_id=user_id, shop_id=shop_id, shop_name=shops.name, quantity=shops.quantity, feedback=feedback, appetite=appetite)
            history_data.save()

            return Response(personal_data.proper_quantity, status=202)
        except Exception as e:
            print("Error:", str(e))
            return Response({'message': str(e)}, status=500)

class searchView(APIView):
    def get(self, request):
        try:
            user_id = request.META.get("HTTP_USER_ID")
            appetite = request.META.get("HTTP_APPETITE")
            
            #print(f"user_id={user_id}")
            #print(f"appetite={appetite}")

            #obtain personal data of user_id
            personal_data = PersonalData.objects.filter(user_id=user_id).first()
            personal_proper_quantity = personal_data.proper_quantity
            #print(f"proper_quantity={personal_data.proper_quantity}")

            #calculate today's meal quantity
            today_quantity = (1+0.1*(int(appetite)-3))*float(personal_proper_quantity)

            #print(f"today's quantity={today_quantity}")

            # Less Than or Equal to today's meal quantity
            shops = Shop.objects.filter(quantity__lte = int(today_quantity)).order_by('-quantity')
            #print(shops)
            serializer_shop = ShopSerializer(shops, many=True)

            response_data = serializer_shop.data
            #print(response_data)
            return Response(response_data, status=202)
        
        except Exception as e:
            return Response({'message': str(e)}, status=500)