from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", home, name="home"),
    
    path("categories/", category_list, name="category-list"),
    path("categories/<int:id>/", category, name="category"),
    path("categories/<int:id>/update/", update_category, name="update-category"),
    path("categories/<int:id>/delete/", delete_category, name="delete-category"),
    
    path("products/", product_list, name="product-list"),
    path("products/<int:id>/", products, name="product"),
    path("products/<int:id>/update/", update_product, name="update-product"),
    path("products/<int:id>/delete/", delete_product, name="delete-product"),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
