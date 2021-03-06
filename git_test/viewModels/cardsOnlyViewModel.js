(function (global){
    var CardsOnlyViewModel,
    app=global.app=global.app || {};
    

    
    CardsOnlyViewModel =kendo.data.ObservableObject.extend({
        selectedAccount : {
            IBAN_BBAN: "",
            accountNumber: "",
            availableBalance: "",
            currency: "",
            currentBalance: "",
            type: ""
        },
        
        
        
        accountsData:[],
        
        _private: {
               datasource : new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://localhost/data/data-php.php",
                        dataType: "json"
                    }
                }
            })  
        },
        
        init: function () {
            var that = this;
            
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
           
            $.getJSON("http://192.168.0.22/mb-server/cardsOnlyUpdated",function(data){
                that.set('accountsData',data);
                that.set('selectedAccount',data[0]);
            });
            
           
            that.scrollViewInit();
            
            
        },
        
        requestFullStatement:function(){
           app.application.navigate("views/requestStatementView.html");
        },
        
        requestMiniStatement:function(){
           app.application.navigate("views/miniStatementView.html");
        },
        scrollViewInit: function(){
            console.log("init scroll view");
        },
        
        addBalanceToCard:function(){
             app.application.navigate("views/addBalanceToCard.html");
        },
        
        
        show: function(){
            
        },
        
        
        //192.168.0.22DataSource2:[{"accountNumber":"0450\/0375056\/001\/1607\/000","IBAN_BBAN":"PS40 PALS 0450 0375 0560 0116 0700 0","type":"overdraft master card USD","availableBalance":"10025.75","currentBalance":"12025.75","currency":"USD"},{"accountNumber":"0450\/0375056\/001\/1735\/001","IBAN_BBAN":"PS26 PALS 0450 0375 0560 0117 3500 1","type":"OVERDUE NORMAL LOANS USD","availableBalance":"10015.75","currentBalance":"11025.75","currency":"USD"}],
        
        //192.168.0.22DataSource:new kendo.data.DataSource({
        //        transport: {
        //            read: {
        //                url:"http://localhost/data/data-php.php",
        //                dataType: "json"
                        
        //            }
        //        }
        //    })
        
        pageChange: function(e){
            var that = this,
            $page = e.element.find('[data-role="page"]'),
            accountNo = $page.attr('data-accountNo'),
            viewModel = app.cardsOnlyService.viewModel,
            accountsData = viewModel.accountsData;
            console.log(accountNo);
            
            for(var x in accountsData){
                if(accountsData[x].accountNumber === accountNo){
                    viewModel.set('selectedAccount', accountsData[x]);
                }
            }
            
            //console.log('accountNumber= '+ accountNo);
        }
        
    });
    
    
    
    
 
    
    
    
   
    app.cardsOnlyService = {
        viewModel: new CardsOnlyViewModel()
    };
    
})(window);