from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse


def service_worker(request):
    sw_path = settings.BASE_DIR / "front/static" / "sw.js"
    response = HttpResponse(open(sw_path).read(), content_type='application/javascript')
    return response

def my_game(request):
    return render(request,'index.html')
def third_page(request):
    return render(request,'geogebra.html')