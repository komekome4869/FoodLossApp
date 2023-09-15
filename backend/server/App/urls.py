from django.urls import path
from .views import shopView, feedbackView, searchView

app_name = 'App'
urlpatterns = [
    path('login/', shopView.as_view(), name='shop'),
    path('feedback/', feedbackView.as_view(),name='feedback'),
    path('search/',searchView.as_view(),name='search'),
]
