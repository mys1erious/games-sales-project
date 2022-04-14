from django.contrib import admin
from django.urls import path, include

from core import apiv1_urls


urlpatterns = [
    path(
        route='api/v1/',
        view=include(apiv1_urls),
        name='apiv1_urls'
    ),

    path('admin/', admin.site.urls),
]
