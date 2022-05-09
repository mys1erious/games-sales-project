from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..models import Sale
from .serializers import SaleSerializer

from core.permissions import IsAdminOrIsAuthenticatedReadOnly


class SaleListAPIView(APIView):
    permission_classes = (IsAdminOrIsAuthenticatedReadOnly, )

    # Rework search ->
    def get(self, request, *args, **kwargs):
        name = request.query_params.get('name', None)
        yor = request.query_params.get('year_of_release', None)

        sales = Sale.objects.all()
        if name:
            sales = Sale.objects.filter(game__name__startswith=name)
        if yor:
            sales = sales.filter(game__year_of_release__exact=yor)

        serializer = SaleSerializer(sales, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = SaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SaleDetailAPIView(APIView):
    permission_classes = (IsAdminOrIsAuthenticatedReadOnly, )

    def get(self, request, uuid, format=None):
        sale = get_object_or_404(Sale, uuid=uuid)
        serializer = SaleSerializer(sale, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, uuid, format=None):
        sale = get_object_or_404(Sale, uuid=uuid)
        serializer = SaleSerializer(sale, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uuid, format=None):
        sale = get_object_or_404(Sale, uuid=uuid)
        sale.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
