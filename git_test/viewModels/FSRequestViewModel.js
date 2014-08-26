(function (global){
    var FSRequestViewModel,
    app=global.app=global.app || {};
    

    
    FSRequestViewModel =kendo.data.ObservableObject.extend({
       
        
        
        
        navigateToMobileFullStatement:function(){app.application.navigate("views/fullStatementView.html")},
        
        requestPDFEmail:function(){alert("an email will be sent to your registered email ")},
        
        RequestPDFDownload:function(){alert("your downlaod will start soon ")}
        
    });
    
    
    
    
    
   
    
    
    
    
    
   
    app.FSRequestService = {
        viewModel: new FSRequestViewModel()
    };
    
})(window);