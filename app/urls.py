from django.urls import path
from .views import home, category_list, product_list


urlpatterns = [
    path("", home, name="home"),
    path("categories/", category_list, name="category-list"),
    path("products/", product_list, name="product-list"),
]
