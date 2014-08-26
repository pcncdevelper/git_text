(function (global) {
    var map,
        geocoder,
        LocationViewModel,
        app = global.app = global.app || {};

    LocationViewModel = kendo.data.ObservableObject.extend({
        _lastMarker: null,
        _lastMarker2: null,
        _isLoading: false,

        address: "",
        isGoogleMapsInitialized: false,

        onNavigateHome: function () {
            var that = this,
            
                position;
             var myLatlng = new google.maps.LatLng(31.9060819,35.2027778);
            that._isLoading = true;
            that.toggleLoading();

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.panTo(position);
                    that._putMarker(position);

                    that._isLoading = false;
                    that.toggleLoading();
                    var myLatlng = new google.maps.LatLng(31.7101337,35.2070302);
                    var myLatlng2 = new google.maps.LatLng(31.7101337,35.2070302);
                    var myLatlng3 = new google.maps.LatLng(31.5338812,35.1099533);
                    
                    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Ramallah Branch'
  });
                    var marker2 = new google.maps.Marker({
      position: myLatlng2,
      map: map,
      title: 'Bethlehem Branch'
  }); 
                    
                    var marker3 = new google.maps.Marker({
      position: myLatlng3,
      map: map,
      title: 'Hebron Branch'
  });
                    
                    
                },
                function (error) {
                    //default map coordinates
                    position = new google.maps.LatLng(70.459336, -80.462494);
                    position2 = new google.maps.LatLng(31.9060819, 35.2027778);
                    position3 = new google.maps.LatLng(31.7101337, 35.2070302);
                    map.panTo(position);

                    that._isLoading = false;
                    that.toggleLoading();

                    navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                        function () { }, "Location failed", 'OK');
                },
                {
                    timeout: 30000,
                    enableHighAccuracy: true
                }
            );
        },

        onSearchAddress: function () {
            var that = this;

            geocoder.geocode(
                {
                    'address': that.get("address")
                },
                function (results, status) {
                    if (status !== google.maps.GeocoderStatus.OK) {
                        navigator.notification.alert("Unable to find address.",
                            function () { }, "Search failed", 'OK');

                        return;
                    }

                    map.panTo(results[0].geometry.location);
                    that._putMarker(results[0].geometry.location);
                });
        },

        toggleLoading: function () {
            if (this._isLoading) {
                kendo.mobile.application.showLoading();
            } else {
                kendo.mobile.application.hideLoading();
            }
        },

        _putMarker: function (position) {
            var that = this;

            if (that._lastMarker !== null && that._lastMarker !== undefined) {
                that._lastMarker.setMap(null);
            }


            that._lastMarker = new google.maps.Marker({
                map: map,
                position: position
            });
            
            
                     }
    });

    app.locationService = {
        initLocation: function () {
            var mapOptions;

            if (typeof google === "undefined") {
                return;
            }

            app.locationService.viewModel.set("isGoogleMapsInitialized", true);

            mapOptions = {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },

                mapTypeControl: false,
                streetViewControl: false
            };

            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            geocoder = new google.maps.Geocoder();
            app.locationService.viewModel.onNavigateHome.apply(app.locationService.viewModel, []);
        },

        show: function () {
            if (!app.locationService.viewModel.get("isGoogleMapsInitialized")) {
                return;
            }

            //resize the map in case the orientation has been changed while showing other tab
            google.maps.event.trigger(map, "resize");
        },

        hide: function () {
            //hide loading mask if user changed the tab as it is only relevant to location tab
            kendo.mobile.application.hideLoading();
        },

        viewModel: new LocationViewModel()
    };
}
)(window);