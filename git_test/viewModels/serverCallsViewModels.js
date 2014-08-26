(function (global) {
    var ServerCallsViewModels,
        app = global.app = global.app || {};

    ServerCallsViewModels = kendo.data.ObservableObject.extend({
        
        callFunction:function(funName){
            
        }
        
        
    });

    app.serverService = {
        viewModel: new ServerCallsViewModels()
    };
})(window);