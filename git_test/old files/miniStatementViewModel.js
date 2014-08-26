(function (global) {
    var TransactionsViewModel,
    app = global.app = global.app || {};

    TransactionsViewModel = kendo.data.ObservableObject.extend({

        /*Bound to the MiniStatement Table html */
        transactionsData:[],
        
        init: function () {
  
            var that = this;
            var dataSource;
          
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://mail.pcnc2000.com:8081/mb-server/transactions",
                       
                        dataType: "json"
                    }
                }
            });           
            
                dataSource.fetch(function(){
              
                  /* get the Length of the TransActions Array*/
                     var len=dataSource._total;
             
                     tempTrans=new Array();
                        for(var i=0;i<len;i++){
                             var trans = dataSource.at(i);
                        
                             var explanation_toLower = (trans.explanation).toLowerCase();
                             var explanation_Cap_first = explanation_toLower.substr(0, 1).toUpperCase() + explanation_toLower.substr(1); 
                  
                            var unFormatedAmount = trans.ammount;
                            var formatedAmount = numeral(unFormatedAmount).format('0,0.0');
                        
                            tempTrans.push("<tr><td>" + trans.date + "</td><td>"
                                  + explanation_Cap_first + "</td><td>"
                                  + formatedAmount + "</td></tr>");  
                           }
                    
                  /* clear the commas from the temTrans Array*/
                      tempTransCleared=tempTrans.join('');
                                  
                  /* update the transactionsData (in the View-Model) */
                      that.set("transactionsData",tempTransCleared);
                     // console.log("transactionsData after set");
                     // console.log(that.transactionsData);
                });
        }
    });

    app.transactionsService = {
        viewModel: new TransactionsViewModel()
    };
})(window);