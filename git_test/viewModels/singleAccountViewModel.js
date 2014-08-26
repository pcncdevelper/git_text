(function (global) {
    
    // var windHeight = $(window).height();
    ////alert(windHeight);
    //divheight=windHeight/1;
    //divmargin=windHeight/1.9;
    //console.log("div height "+divheight);
    // $('#accounts-scrollview').css('height',200);
   //  $('#testdiv').css('margin-top',divmargin);
    
    
    
    
    
    
    
    var SingleAccountViewModel,
        app = global.app = global.app || {};

    SingleAccountViewModel = kendo.data.ObservableObject.extend({
        singleAccountDataSource: null,

        testSource:[{"accountNumber":"0450\/0375056\/001\/1607\/000","IBAN_BBAN":"PS40 PALS 0450 0375 0560 0116 0700 0","type":"overdraft master card USD","availableBalance":"10025.75","currentBalance":"12025.75","currency":"USD"},{"accountNumber":"0450\/0375056\/001\/1735\/001","IBAN_BBAN":"PS26 PALS 0450 0375 0560 0117 3500 1","type":"OVERDUE NORMAL LOANS USD","availableBalance":"10015.75","currentBalance":"11025.75","currency":"USD"}],
        
        init: function () {
            var that = this,
                dataSource;

            kendo.data.ObservableObject.fn.init.apply(that, []);
          
            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://mail.pcnc2000.com:8081/mb-server/accounts",
                        dataType: "json"
                    }
                }
            });

            that.set("singleAccountDataSource", dataSource);
        }
    });

    app.singleAccountService = {
        viewModel: new SingleAccountViewModel()
    };
})(window);