from django.urls import path

from games.api import views as game_views
from sales.api import views as sale_views
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
    # {% url 'api:games' ratings %}
    path(
        route='games/ratings/',
        view=game_views.RatingListCreateAPIView.as_view(),
        name='games'
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
    )
]



# {
#     "game": {
#             "name": "name_test7",
#             "platform": "",
#             "publisher": "",
#             "developer": "",
#             "genre": "",
#             "year_of_release": null,
#             "esrb_rating": "",
#             "rating": {
#                 "critic_score": 12.0,
#                 "critic_count": 22.0,
#                 "user_score": 42.0,
#                 "user_count": 120.0
#             }
#     },
#     "NA_sales": 11,
#     "EU_sales": 12,
#     "JP_sales": 13,
#     "other_sales": 14,
#     "global_sales": 15
# }