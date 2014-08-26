(function (global) {
    var LandingPageViewModel,
    app = global.app = global.app || {};

    LandingPageViewModel = kendo.data.ObservableObject.extend({

              info: function () {
                  console.log("info clicked");
             app.application.navigate("views/drawer-infoView.html");
           
            
        },
			locations: function () {
                  console.log("locations clicked");
             app.application.navigate("views/drawer-locationsView.html");
           
            
        },
        
			aboutUs: function () {
                  console.log("info clicked");
             app.application.navigate("views/drawer-aboutUsView.html");
           
            
        },
        
        showDrawer:function(){
            Mydrawer=$("my-drawer");
            console.log("showDrawer");
            console.log(Mydrawer);
        }

       


    });

    app.landingPageService = {
        viewModel:new LandingPageViewModel()  
  
    };
})(window);