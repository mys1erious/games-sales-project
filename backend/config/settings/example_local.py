from .base import *


DEBUG = True

# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# DATABASES = {
#     'default': {
#         'ENGINE': get_env_variable('DATABASE_ENGINE'),
#         'NAME': get_env_variable('DATABASE_NAME'),
#         'USER': get_env_variable('DATABASE_USER'),
#         'PASSWORD': get_env_variable('DATABASE_PASSWORD'),
#         'HOST': get_env_variable('DATABASE_HOST'),
#         'PORT': get_env_variable('DATABASE_PORT')
#     }
# }

# INSTALLED_APPS += []

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'games_sales', 'static'),
#     os.path.join(BASE_DIR, 'games_sales', 'media')
# ]

# STATIC_ROOT = os.path.join(BASE_DIR, 'games_sales', 'static_cdn')
# MEDIA_ROOT = os.path.join(BASE_DIR, 'games_sales', 'media_cdn')


# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:3000',
# ]

ALLOWED_HOSTS = ['test-dj-react-app.herokuapp.com', '127.0.0.1:8000', 'localhost']
