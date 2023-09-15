from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Shop(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField(blank=True)
    location = models.CharField(max_length=100)
    opening_time = models.CharField(max_length=100)
    img_url = models.CharField(max_length=300)
    num_fb = models.IntegerField(blank=True)
    genre = models.CharField(max_length=100)
    explanation = models.CharField(max_length=500)
    price = models.CharField(max_length=100)
    


    def __str__(self):
        return self.name + "("+ str(self.location) +")"

class PersonalData(models.Model):
    user_id = models.CharField(max_length=100)
    proper_quantity = models.IntegerField(blank=True)
    height = models.IntegerField(blank=True)
    weight = models.IntegerField(blank=True)
    birthday = models.DateTimeField()
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)

    def __str__(self):
        return self.user_id
    
class HistoryData(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    user_id = models.CharField(max_length=100)
    shop_id = models.IntegerField(blank=True)
    shop_name = models.CharField(max_length=100)
    quantity = models.IntegerField(blank=True)
    feedback = models.IntegerField(validators=[MinValueValidator(1),
                                MaxValueValidator(5)])
    appetite = models.IntegerField(validators=[MinValueValidator(1),
                                MaxValueValidator(5)])

    def __str__(self):
        return str(self.date)+ " " +self.user_id + " " + str(self.shop_name)
