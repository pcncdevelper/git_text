(function (global) {
     console.log("app.js");
    
    var mobileSkin = "",
        app = global.app = global.app || {};

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();
        $(document.body).height(window.innerHeight);
    }, false);
// { layout: "main-layout"}
    app.application = new kendo.mobile.Application(document.body , {platform: "ios7" }  , {loading:"<h1> load </h1>"} );

       //  ,,  , { skin: "flat" } { initial: "views/landingPageView.html" } 

    app.changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            mobileSkin = "flat";
        }
        else {
            e.sender.element.text("Flat");
            mobileSkin = "";
        }

        app.application.skin(mobileSkin);
    };
    
    
    function anchor_test() {
	window.alert("This is an anchor test.")
}

   
})(window);


//document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    
    console.log("you are viewing "+app.view().id);
    
    // Handle the back button
}


