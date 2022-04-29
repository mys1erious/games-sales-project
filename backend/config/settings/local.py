from .base import *


DEBUG = True

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': get_env_variable('DATABASE_NAME'),
        'HOST': get_env_variable('DATABASE_HOST'),
        'PORT': get_env_variable('DATABASE_PORT'),
        'USER': get_env_variable('DATABASE_USER'),
        'PASSWORD': get_env_variable('DATABASE_PASSWORD')
    }
}


# INSTALLED_APPS += []

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'games_sales', 'media')


SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False


ALLOWED_HOSTS = ['*']

CORS_ORIGIN_ALLOW_ALL = True



