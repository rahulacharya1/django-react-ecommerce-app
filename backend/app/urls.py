from django.urls import path
from .views import *

urlpatterns = [    
    path("signup/", signup),
    path("login/", login),
    path("logout/", logout),
    path("profile/", profile),
    path("profile/change-password/", change_password),
    path("users/", users_list),

    # CATEGORY
    path("categories/", category_list),
    path("categories/create/", create_category),
    path("categories/<int:id>/", category_detail),
    path("categories/<int:id>/update/", update_category),
    path("categories/<int:id>/delete/", delete_category),

    # PRODUCT
    path("products/", product_list),
    path("products/create/", create_product),
    path("products/<int:id>/", product_detail),
    path("products/<int:id>/update/", update_product),
    path("products/<int:id>/delete/", delete_product),

    # CART
    path("cart/", cart_list),
    path("cart/count/", cart_count),
    path("cart/add/", cart_add),
    path("cart/<int:id>/update/", cart_update),
    path("cart/<int:id>/delete/", cart_delete),
]

