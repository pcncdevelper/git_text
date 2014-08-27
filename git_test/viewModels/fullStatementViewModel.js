(function (global) {
    var FullTransactionsViewModel,
    app = global.app = global.app || {};

    FullTransactionsViewModel = kendo.data.ObservableObject.extend({

          
        transactionsTableHtml:[],               //contains the HTML of the table
        transactionsData:[],                    //contains the data of the transactions of all accounts 
        currentAccountTransactions:[],          //contains the data of the transactions of the selected account
        accountsList:[],                        //contains the list of the accounts Numbers (to be shown in the drop down list)


        //Functions 

        //fired when the view Model is intiated
        init: function () {
            
            var that = this;
            var dataSource;                    // contains the Transactions data

            kendo.data.ObservableObject.fn.init.apply(that, []);
            
            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                       
                        url: "http://192.168.0.22//mb-server/transactions",
                       // url: "localhost//mb-server/transactions",
                        dataType: "json"
                    }
                }
            });
            
            dataSource.fetch(function(){
              
                   
                    var len=dataSource._total;
                   
                    tempAccountsList = new Array();
                             
                    for(var i=0;i<len;i++){
                        var account = dataSource.at(i).accountNumber;
                        tempAccountsList.push(account);    
                    }
     
                          
                    that.set("accountsList",tempAccountsList);
                    that.set("transactionsData",dataSource);
                   //set the first account as the first viewed account 
                that.setCurrentAccountList(that.transactionsData.at(0).accountNumber);   
                    
           });
            
           
            
        },

        setCurrentAccountList:function(accountId) {
            var that = this;
            var len = this.transactionsData._total;

            for (var i = 0;i < len;i++) {
                actNum = this.transactionsData.at(i).accountNumber;

                if (actNum===accountId) {
                    curtran = this.transactionsData.at(i)[0];
                    that.set("currentAccountTransactions", curtran);
                }   
            }
            that.ArrayToTable();
        },

        ArrayToTable:function() {
            console.log("toarray called");
            var that = this;
            var data = that.get("currentAccountTransactions");

            var len = data.length;

            tempTrans = new Array();
            for (var i = 0;i < len;i++) {
                var trans = data[i];

                var explanation_toLower = (trans.explanation).toLowerCase();
                var explanation_Cap_first = explanation_toLower.substr(0, 1).toUpperCase() + explanation_toLower.substr(1); 

                var unFormatedAmount = trans.ammount;
                var formatedAmount = numeral(unFormatedAmount).format('0,0.0');

                tempTrans.push("<tr><td>" + trans.date + "</td><td>"
                               + explanation_Cap_first + "</td><td>"
                               + formatedAmount + "</td></tr>");  
            }

            /* clear the commas from the temTrans Array*/
            tempTransCleared = tempTrans.join('');

            
            /* update the transactionsData (in the View-Model) */
            that.set("transactionsTableHtml", tempTransCleared);
        },

        changed:function(e) {
            var that = this;

            that.setCurrentAccountList(e);
        }



    });

    app.fullTransactionsService = {
        viewModel:new FullTransactionsViewModel()  
  
    };
})(window);