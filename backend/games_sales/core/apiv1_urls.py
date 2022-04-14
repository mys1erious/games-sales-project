from django.urls import path

from games.api import views as game_views
from accounts.api import views as account_views


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
        name='games_ratings',
    )
    # {% url 'api:accounts' %}
    # path(
    #     route='accounts/',
    #     view=account_views...
    #     name='accounts'
    # )
]
