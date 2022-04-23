from django.urls import path, include
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from rest_framework.schemas import get_schema_view

from accounts.api import views as account_views
from games.api import views as game_views
from sales.api import views as sale_views


urlpatterns = [
    # {% url 'api:games' %}
    path(
        route='games/',
        view=game_views.GameListAPIView.as_view(),
        name='games'
    ),
    # {% url 'api:games' game.uuid %}
    path(
        route='games/<uuid:uuid>/',
        view=game_views.GameDetailAPIView.as_view(),
        name='games'
    ),
    # {% url 'api:games' %}
    path(
        route='games/ratings/',
        view=game_views.RatingListCreateAPIView.as_view(),
        name='game_ratings'
    ),


    # {% url 'api:sales' %}
    path(
        route='sales/',
        view=sale_views.SaleListAPIView.as_view(),
        name='sales'
    ),
    # {% url 'api:sales' sale.uuid %}
    path(
        route='sales/<uuid:uuid>/',
        view=sale_views.SaleDetailAPIView.as_view(),
        name='sales'
    ),


    path(
        route='auth/signup/',
        view=account_views.UserSignUpAPIView.as_view(),
        name='account_signup'
    ),
    path(
        route='auth/signout/blacklist/',
        view=account_views.BlackListTokenAPIView.as_view(),
        name='blacklist'
    ),
    path(
        route='auth/token/',
        view=TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),
    path(
        route='auth/token/refresh/',
        view=TokenRefreshView.as_view(),
        name='token_refresh'
    ),


    path(
        route='schema/',
        view=get_schema_view(
            permission_classes=[AllowAny],
            title='GamesSalesAPI',
            description='API for the GamesSalesAPI',
            version='1.0.0'
        ),
        name='openapi-schema'
    ),
]
