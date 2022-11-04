from django.urls import path , include
from . import views
from django.views.generic import TemplateView



urlpatterns = [
    path('',  views.my_game),
    path('sw.js', views.service_worker),
    path('geogebra.html/', views.third_page),
    path('sw.js', (TemplateView.as_view(
      template_name="browsepages/sw.js",
      content_type='application/javascript',)),
      name='serviceworker'),
]