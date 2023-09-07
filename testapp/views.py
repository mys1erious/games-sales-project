from django.http import HttpResponse


def index(request):
    val = 'some vals'
    return HttpResponse(val, status=201)
