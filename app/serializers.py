from rest_framework import serializers
from .models import Categorty, Products

class CategortySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorty
        fields = '__all__'
        
class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'