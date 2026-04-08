from rest_framework import serializers
from .models import Categorty

class CategortySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorty
        fields = '__all__'
        
