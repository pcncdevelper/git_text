(function (global){
    var AccountsOnlyViewModel,
    app=global.app=global.app || {};
    

    
    AccountsOnlyViewModel =kendo.data.ObservableObject.extend({
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
        
        requestFullStatement:function(){
           app.application.navigate("views/requestStatementView.html");
        },
        requestMiniStatement:function(){
           app.application.navigate("views/miniStatementView.html");
        },
        
        init: function () {
            var that = this;
            
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
           
            $.getJSON("http://mail.pcnc2000.com:8081/mb-server/accountsOnlyUpdated",function(data){
                that.set('accountsData',data);
                that.set('selectedAccount',data[0]);
            });
            
           
            that.scrollViewInit();
            
            
        },
        
        scrollViewInit: function(){
            console.log("init scroll view");
        },
        
        
        
        
        show: function(){
            
        },
        
        
        //accountsListDataSource2:[{"accountNumber":"0450\/0375056\/001\/1607\/000","IBAN_BBAN":"PS40 PALS 0450 0375 0560 0116 0700 0","type":"overdraft master card USD","availableBalance":"10025.75","currentBalance":"12025.75","currency":"USD"},{"accountNumber":"0450\/0375056\/001\/1735\/001","IBAN_BBAN":"PS26 PALS 0450 0375 0560 0117 3500 1","type":"OVERDUE NORMAL LOANS USD","availableBalance":"10015.75","currentBalance":"11025.75","currency":"USD"}],
        
        //accountsListDataSource:new kendo.data.DataSource({
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
            viewModel = app.accountsOnlyService.viewModel,
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
    
    
    
    
 
    
    
    
   
    app.accountsOnlyService = {
        viewModel: new AccountsOnlyViewModel()
    };
    
})(window);