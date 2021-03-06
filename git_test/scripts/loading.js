
    var showButton, interval, loaderElement;

    function viewInit(e) {
        showButton = $("#show").bind(kendo.support.mouseup, function() {
                        showButton.animate({ opacity: 0 });
                        startLoading();
                     });

        loaderElement = kendoMobileApplication.pane.loader.element.find("h1");
    }


    function hideLoader() {
        clearInterval(interval);
        kendoMobileApplication.hideLoading(); //hide loading popup
        loaderElement.removeClass("loaderHeading").text("Loading...");
    }

    function viewHide(e) {
        showButton.animate({ opacity: 1 });
        hideLoader();
    }

    function startLoading() {
        hideLoader();
        var seconds = 5;

        loaderElement.text(seconds + " seconds left!").addClass("loaderHeading");

        kendoMobileApplication.showLoading(); //show loading popup

        interval = setInterval(function() {
            loaderElement.text(--seconds + " seconds left!"); //update text of the loading popup

            if (seconds == 0) {
                showButton.animate({ opacity: 1 });
                hideLoader();
            }
        }, 1000);
    }

