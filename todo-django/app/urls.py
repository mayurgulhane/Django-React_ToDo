from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.TodoList),
    path('todos/<int:id>', views.TodoDetail),
]
