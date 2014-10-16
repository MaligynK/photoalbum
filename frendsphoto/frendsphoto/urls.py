from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'frendsphoto.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^admin/', include(admin.site.urls)),
	 (r'^index.html$', 'frendsphoto.views.home'),
	 (r'^callback.html$', 'frendsphoto.views.callback'),
	# (r'^$', 'frendsphoto.views.home'),
)
