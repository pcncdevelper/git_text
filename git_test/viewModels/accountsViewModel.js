(function (global){
    var AccountsViewModel,
    app=global.app=global.app || {};
    

    
    AccountsViewModel =kendo.data.ObservableObject.extend({
        selectedAccount : {
            IBAN_BBAN: "",
            accountNumber: "",
            availableBalance: "",
            currency: "",
            currentBalance: "",
            type: ""
        },
        
        
          //testSource:[{"accountNumber":"0450\/0375056\/001\/1607\/000","IBAN_BBAN":"PS40 PALS 0450 0375 0560 0116 0700 0","type":"overdraft master card USD","availableBalance":"10025.75","currentBalance":"12025.75","currency":"USD"}],
        //,{"accountNumber":"0450\/0375056\/001\/1735\/001","IBAN_BBAN":"PS26 PALS 0450 0375 0560 0117 3500 1","type":"OVERDUE NORMAL LOANS USD","availableBalance":"10015.75","currentBalance":"11025.75","currency":"USD"}],
       
       
       //actNum:"0450/0375056/001/1607/000",
        
       // singleAccountDataSource : new kendo.data.DataSource({
       //     transport: {
       //         read:{
       //             url: "http://localhost/mb-server/index.php/test/viewAccount",
       //             dataType: "json",
                    
       //         }
                
       //     },
       //     filter: { field: "accountNumber", operator: "equals", value:this.actNum }
       // }),
        
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
            
           
            $.getJSON("http://192.168.0.22/mb-server/accounts",function(data){
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
            viewModel = app.accountsService.viewModel,
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
    
    
    
    
    
   
   /* pageChange=function(){
            console.log("page changed");
    AccountsViewModel.singleAccountDataSource.fetch(function(){
        
         var view = dataSource.view();
        console.log(view.length);
        
              })
        };*/
    
    
    
    
    
    
    
    
   
    app.accountsService = {
        viewModel: new AccountsViewModel()
    };
    
})(window);