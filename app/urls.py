from django.urls import path
from .views import *

urlpatterns = [
    path("", home),
    
    path("login/", login),

    # CATEGORY
    path("categories/", category_list),
    path("categories/<int:id>/", category_detail),
    path("categories/<int:id>/update/", update_category),
    path("categories/<int:id>/delete/", delete_category),

    # PRODUCT
    path("products/", product_list),
    path("products/<int:id>/", product_detail),
    path("products/<int:id>/update/", update_product),
    path("products/<int:id>/delete/", delete_product),
]

