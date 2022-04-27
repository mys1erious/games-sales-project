from rest_framework.permissions import BasePermission

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        try:
            if request.user and request.user.is_admin:
                return True
        except AttributeError:
            if request.method in SAFE_METHODS and request.user and request.user.is_authenticated:
                return True
        return False
