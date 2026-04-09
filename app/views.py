from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Categorty, Products
from .serializers import CategortySerializer, ProductsSerializer

# Create your views here.

def home(request):
    return render(request, 'home.html')

@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        categories = Categorty.objects.all()
        serializer = CategortySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategortySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':
        products = Products.objects.all()
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProductsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    
