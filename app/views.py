from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

# Create your views here.

def home(request):
    return render(request, 'home.html')

#------------------- CATEGORY VIEWS -------------------#

@api_view(['GET'])
def category_list(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def category(request, id):
    category = Category.objects.get(id=id)
    serializer = CategorySerializer(category)
    return Response(serializer.data)

@api_view(['PUT'])
def update_category(request, id):
    category = Category.objects.get(id=id)
    serializer = CategorySerializer(category, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_category(request, id):
    category = Category.objects.get(id=id)
    category.delete()
    return Response('Category deleted successfully')

#------------------- PRODUCT VIEWS -------------------#

@api_view(['GET'])
def product_list(request):
    product = Product.objects.all()
    serializer = ProductSerializer(product, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def products(request, id):
    product = Product.objects.get(id=id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_product(request, id):
    product = Product.objects.get(id=id)
    product.delete()
    return Response('Product deleted successfully')

@api_view(['PUT'])
def update_product(request, id):
    product = Product.objects.get(id=id)
    serializer = ProductSerializer(product, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)
