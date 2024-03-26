from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt,datetime
# Create your views here.
class RegisterView(APIView): 
    '''
    Should register a unique user into the SIFSearch website.
    '''
    def  post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
class LoginView(APIView):
    def post (self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed("User Not Found. Please Try Again or Register")
        
        # validate the password
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password. Please Try Again ")
        
        # Create JWT Token (accessible for 60 minutes)
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow(), # token creation date
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256') # hashing algorithm useed
        response = Response()
        response.set_cookie(key='jwtToken', value=token, httponly=True, samesite='None', secure=True,max_age=3600) # cookie is sent to browser
        response.data = {
            'jwt':token
        }
        return response
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwtToken')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        user = User.objects.filter(id=payload['id']).first()
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)
# Simply Remove the Cookie
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie(key='jwtToken', samesite='None') # cookie is sent to browser
        return response



