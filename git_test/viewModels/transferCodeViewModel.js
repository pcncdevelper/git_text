(function (global) {
    var TransferCodeViewModel,
        app = global.app = global.app || {};

    TransferCodeViewModel = kendo.data.ObservableObject.extend({
       
        /* array:[15,32,23,45,35,66,76,24,59,87,46,13,75,84,36,97,14,69,74,37,12,76,95,16,85,11,,41,63,98,17,77],*/
         array2:[4041,2866,6391,5817,0196,4402,9128,7606,6859,9102,2373,5216,9341,6966,8781,3334,2332,7993,8354,4616,8487,9529,1091,9061,5150,6885,6992,6671,7632,2093],
       
        array3:[125045,54720,562007,988159,299060,997681,27529,455652,160084,699563,544889,836808,
        147958,191603,453584,302594,592577,201394,184706,799569,900469,133625,324668,226001,
        211777,430446,370153,934379,145390,901416],
        
        array:[125045,27529,147958,184706,211777
        ,54720,455652,191603,799569,430446,
        562007,160084,453584,900469, 370153,
        988159,699563,302594,133625,934379, 
        299060,544889,592577,324668,145390,
        997681,836808,201394,226001,901416],

        
        num:[],
        
        enteredNumber:[],
        
        

        
        
        approved:false,
        closeFavortiesModal:function(){
            
             $("#modal-favorite-name").val("");
             $("#modalview-add-to-favorites").kendoMobileModalView("close");
            
        }, 
        closeFavortiesFailModal:function(){
            
             $("#modalview-favorites-fail").kendoMobileModalView("close");
            
        },
        
        init2:function(){
           
            alert();
         /*   console.log("init started");
            $("#my-a").click(function(e) {
    e.preventDefault();
    alert('clicked');  
    return false;  
          });  
            
            
            
            
            
            
            $("#my-a").onclick =function(){
                console.log("a clicked");
                $("#my-select").click();
                
            };*/
            
        },
        
        checkDiffTransfersCanFavorite:function(){
            
            
            
            console.log("hello");
             var from = document.getElementById("dtransfer-from-accounts-list-drop-down");
 
             console.log(from.options[from.selectedIndex].index);
        
             _index_from=from.options[from.selectedIndex].index;
            
            
            //dtransfer-to-accosunts-list-drop-down
             var to = document.getElementById("dtransfer-to-accosunts-list-drop-down");
 
        console.log(to.options[to.selectedIndex].index);
        
        _index_to=to.options[to.selectedIndex].index; 

            
            console.log("from "+ _index_from +"To "+ _index_to);
            
            
            var amount =document.getElementById("dAccount-amount").value;
            console.log(amount);
            
          
            /* var isAmountRight=isNaN('a');
            console.log("its not right "+isAmountRight);*/
            if(amount!=="")
            {
             console.log("valid value");   
            }
            else 
            {
                console.log("invalid value");
            }
            
            if(_index_from !==0 && _index_to!==0 && amount!=="")
            { 
             console.log("returned True");
              // alert("Added to to Favorites");
                 $("#modalview-add-to-favorites").data("kendoMobileModalView").open();
                return true;
               
            }
            else
            {
                  $("#modalview-favorites-fail").data("kendoMobileModalView").open();
            console.log("returned false");
               //   alert("Please Check your input fileds");
                return false;
            }
            
            
        },
        
        
        checkTransfersCanFavorite:function(){
            
          
            	
             var from = document.getElementById("accounts-list-drop-down");
 
             console.log(from.options[from.selectedIndex].index);
        
        _index_from=from.options[from.selectedIndex].index;
          
            var to = document.getElementById("accounts-list-drop-down-to");
 
        console.log(to.options[to.selectedIndex].index);
        
        _index_to=to.options[to.selectedIndex].index;
            
            
            console.log("current index"+_index_from+"to account"+_index_to);
            
            console.log("Favorite Clicked");
            
           var amount =document.getElementById("amount-to-exchange").value;
            console.log(amount);
            
          
            /* var isAmountRight=isNaN('a');
            console.log("its not right "+isAmountRight);*/
            if(amount!=="")
            {
             console.log("valid value");   
            }
            else 
            {
                console.log("invalid value");
            }
            
            if(_index_from !==0 && _index_to!==0 && amount!=="")
            { 
             console.log("returned True");
              // alert("Added to to Favorites");
                 $("#modalview-add-to-favorites").data("kendoMobileModalView").open();
                return true;
               
            }
            else
            {
                  $("#modalview-favorites-fail").data("kendoMobileModalView").open();
            console.log("returned false");
               //   alert("Please Check your input fileds");
                return false;
            }
            
        },
        
        
        generateRandomInt: function () {
            
            
            
          /*$("#money-exchange-input").kendoNumericTextBox({
                        
                       
                    });
            */
            
            
            
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
})(window);