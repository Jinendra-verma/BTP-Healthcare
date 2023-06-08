from rest_framework.views import APIView
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import BasePermission
from doctor.models import doctor
from patient.models import patient
from django.http import JsonResponse
import folium
import requests
from geopy.distance import distance
from geopy.geocoders import Nominatim

BASE_URL = 'https://nominatim.openstreetmap.org/search?format=json'


class GeolocationView(APIView):

    def get_lat_lng_from_postcode(postcode):
        geolocator = Nominatim(user_agent="my-application")
        location = geolocator.geocode(postcode)
        if location:
            return location.latitude, location.longitude
        return None, None

    def get(self, request, format=None):
        Patient = patient.objects.get(user=request.user)
        user_pincode = Patient.pincode
        print(user_pincode)
        response = requests.get(f"{BASE_URL}&postalcode={user_pincode}&country=India")
        """lat, lng = self.get_lat_lng_from_postcode(user_pincode)"""
        data = response.json()

        Userlatitude = data[0].get('lat')
        Userlongitude =data[0].get('lon')
        Userlocation = (Userlatitude,Userlongitude)
        print(Userlocation)

        
        query = doctor.objects.all()
        nearby_dr = [Userlocation]
        for dr in query:
            dr_pincode = dr.pincode
            response = requests.get(f"{BASE_URL}&postalcode={dr_pincode}&country=India")
            data = response.json()
            Doclocation = (data[0].get('lat') , data[0].get('lon'))
            dis = distance(Userlocation,Doclocation)
            print(dis)
            print(Doclocation)
            if dis<50.0 :
                nearby_dr.append(Doclocation)
        return Response(nearby_dr,status=status.HTTP_200_OK)
    