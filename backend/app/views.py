from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from .models import Category, Product, CartItem
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage


def _safe_positive_int(value, default):
    try:
        parsed = int(value)
        return parsed if parsed > 0 else default
    except (TypeError, ValueError):
        return default


def _paginated_response(request, queryset, serializer_class, context=None, default_page_size=10):
    page = _safe_positive_int(request.query_params.get('page'), 1)
    page_size = _safe_positive_int(request.query_params.get('page_size'), default_page_size)

    paginator = Paginator(queryset, page_size)
    if paginator.count == 0:
        return Response({
            'count': 0,
            'total_pages': 0,
            'current_page': 1,
            'page_size': page_size,
            'results': []
        })

    try:
        page_obj = paginator.page(page)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)

    serializer = serializer_class(page_obj.object_list, many=True, context=context or {})
    return Response({
        'count': paginator.count,
        'total_pages': paginator.num_pages,
        'current_page': page_obj.number,
        'page_size': page_size,
        'results': serializer.data
    })


# ================= CATEGORY ================= #

@api_view(['GET'])
@permission_classes([AllowAny])
def category_list(request):
    categories = Category.objects.all().order_by('name')

    search = request.query_params.get('search', '').strip()
    if search:
        categories = categories.filter(
            Q(name__icontains=search) | Q(description__icontains=search)
        )

    has_pagination_params = any(
        request.query_params.get(key) is not None
        for key in ['page', 'page_size', 'search']
    )

    if has_pagination_params:
        return _paginated_response(request, categories, CategorySerializer, default_page_size=6)

    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def category_detail(request, id):
    category = get_object_or_404(Category, id=id)
    serializer = CategorySerializer(category)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_category(request, id):
    category = get_object_or_404(Category, id=id)
    serializer = CategorySerializer(category, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_category(request, id):
    category = get_object_or_404(Category, id=id)
    category.delete()
    return Response({'message': 'Category deleted successfully'})


# ================= PRODUCT ================= #

@api_view(['GET'])
@permission_classes([AllowAny])
def product_list(request):
    products = Product.objects.select_related('category').all().order_by('-id')

    search = request.query_params.get('search', '').strip()
    if search:
        products = products.filter(
            Q(name__icontains=search) | Q(description__icontains=search)
        )

    category_name = request.query_params.get('category_name', '').strip()
    if category_name and category_name.lower() != 'all':
        products = products.filter(category__name=category_name)

    has_pagination_params = any(
        request.query_params.get(key) is not None
        for key in ['page', 'page_size', 'search', 'category_name']
    )

    if has_pagination_params:
        return _paginated_response(
            request,
            products,
            ProductSerializer,
            context={'request': request},
            default_page_size=6
        )

    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    serializer = ProductSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request, id):
    product = get_object_or_404(Product, id=id)
    serializer = ProductSerializer(product, context={'request': request})
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request, id):
    product = get_object_or_404(Product, id=id)
    serializer = ProductSerializer(product, data=request.data, partial=True, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request, id):
    product = get_object_or_404(Product, id=id)
    product.delete()
    return Response({'message': 'Product deleted successfully'})


# ================= AUTH ================= #

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            'message': 'Account created successfully'
        }, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff,
                'message': 'Login successful'
            }, status=200)
        return Response({'error': 'Invalid credentials'}, status=400)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response({'message': 'Logged out successfully'})


@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user

    if request.method in ['PUT', 'PATCH']:
        serializer = ProfileUpdateSerializer(user, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_staff': user.is_staff,
                'date_joined': user.date_joined,
                'message': 'Profile updated successfully'
            })
        return Response(serializer.errors, status=400)

    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'is_staff': user.is_staff,
        'date_joined': user.date_joined,
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()

        Token.objects.filter(user=request.user).delete()
        token = Token.objects.create(user=request.user)

        return Response({
            'message': 'Password updated successfully',
            'token': token.key,
        })
    return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def users_list(request):
    users = User.objects.all().order_by('-date_joined')

    search = request.query_params.get('search', '').strip()
    if search:
        users = users.filter(
            Q(username__icontains=search) |
            Q(email__icontains=search) |
            Q(first_name__icontains=search) |
            Q(last_name__icontains=search)
        )

    role = request.query_params.get('role', '').strip().lower()
    if role == 'admin':
        users = users.filter(is_staff=True)
    elif role == 'user':
        users = users.filter(is_staff=False)

    has_pagination_params = any(
        request.query_params.get(key) is not None
        for key in ['page', 'page_size', 'search', 'role']
    )

    if has_pagination_params:
        return _paginated_response(request, users, AdminUserSerializer, default_page_size=8)

    serializer = AdminUserSerializer(users, many=True)
    return Response(serializer.data)


# ================= CART ================= #

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart_list(request):
    items = CartItem.objects.filter(user=request.user).select_related('product')
    serializer = CartItemSerializer(items, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart_count(request):
    total_count = CartItem.objects.filter(user=request.user).aggregate(total=Sum('quantity')).get('total') or 0
    return Response({'count': total_count})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cart_add(request):
    serializer = CartAddSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    product = get_object_or_404(Product, id=serializer.validated_data['product_id'])
    quantity_to_add = serializer.validated_data.get('quantity', 1)

    item, created = CartItem.objects.get_or_create(
        user=request.user,
        product=product,
        defaults={'quantity': quantity_to_add}
    )

    if not created:
        item.quantity += quantity_to_add
        item.save(update_fields=['quantity', 'updated_at'])

    response_serializer = CartItemSerializer(item, context={'request': request})
    return Response(response_serializer.data, status=201 if created else 200)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def cart_update(request, id):
    item = get_object_or_404(CartItem, id=id, user=request.user)
    quantity = request.data.get('quantity')

    if quantity is None:
        return Response({'error': 'Quantity is required.'}, status=400)

    try:
        quantity = int(quantity)
    except (TypeError, ValueError):
        return Response({'error': 'Quantity must be a number.'}, status=400)

    if quantity < 1:
        return Response({'error': 'Quantity must be at least 1.'}, status=400)

    item.quantity = quantity
    item.save(update_fields=['quantity', 'updated_at'])
    serializer = CartItemSerializer(item, context={'request': request})
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cart_delete(request, id):
    item = get_object_or_404(CartItem, id=id, user=request.user)
    item.delete()
    return Response({'message': 'Item removed from cart.'}, status=200)

