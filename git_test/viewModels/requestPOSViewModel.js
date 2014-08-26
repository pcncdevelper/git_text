(function (global) {
    var RequestPOSViewModel,
        app = global.app = global.app || {};

    RequestPOSViewModel = kendo.data.ObservableObject.extend({
       
         array:[15,32,23,45,35,66,76,24,59,87,46,13,75,84,36,97,14,69,74,37,12,76,95,16,85,11,,41,63,98,17,77],
        
        num:[],
        
        enteredNumber:[],
        
        approved:false,
        
        generateRandomInt: function () {
            var that = this;
            Randnum=Math.floor((Math.random()*30)+1);
            console.log
            app.transferCodeService.viewModel.set('num',Randnum);
            console.log("generate Random called"+that.num);
        },
        
        checkTransferCode:function(){
            
            var that=app.transferCodeService.viewModel;
            myRandNum = that.get('num');
            myEnteredNum=that.get('enteredNumber');
            myCode=that.array[myRandNum-1];
            console.log("the code is "+myCode);
            console.log("the num is "+myEnteredNum);
            
            
            if(myEnteredNum==myCode)
            {
            console.log("right Code");
                 $("#modalview-login").kendoMobileModalView("close");
            alert("Right Code- Transaction Complete");
                 app.application.navigate("views/dashBoardView.html");
                 that.set("enteredNumber", "");
                
            }
            
            else{
            console.log("Wrong Code");
                 $("#modalview-login").kendoMobileModalView("close");
            alert("Wrong Code- Transaction Cancelled");
                 that.set("enteredNumber", "");
                
            }
            
           /* console.log("check transfer run"+that.enteredNumber);
            console.log("Random Number"+that.num);
            console.log("code Number"+that.array[that.num]);
            */
        }
        
    });

    app.transferCodeService = {
        viewModel: new TransferCodeViewModel()
    };
})