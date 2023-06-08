from django.urls import path
from .views import GeolocationView
urlpatterns = [
    path('map/',GeolocationView.as_view())
]