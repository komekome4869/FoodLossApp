from django.contrib import admin
from .models import Shop, PersonalData, HistoryData

# Register your models here.
admin.site.register(Shop)
admin.site.register(PersonalData)
admin.site.register(HistoryData)