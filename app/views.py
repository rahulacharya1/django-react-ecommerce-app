from django.shortcuts import render
from rest_framework import viewsets

from app.serializer import CategortySerializer
from .models import Categorty

# Create your views here.

class CategortyViewSet(viewsets.ModelViewSet):
    queryset = Categorty.objects.all()
    serializer_class = CategortySerializer
    
