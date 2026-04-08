from django.contrib import admin
from django.urls import path
from app import views


urlpatterns = [
    path("categories/", views.CategortyViewSet.as_view({'get': 'list', 'post': 'create'})),
]
