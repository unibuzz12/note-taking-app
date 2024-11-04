from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    #Authentication
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
   
    #Notes
    path('notes/', views.getNotes, name="notes"),
    path('notes/create/', views.createNote, name="create-note"),
    path('notes/<int:pk>/', views.getNote, name="note"),
    path('notes/<int:pk>/update/', views.updateNote, name="update-note"),
    path('notes/<int:pk>/delete/', views.deleteNote, name="delete-note"),
]
