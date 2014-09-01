(function (global) {
    var DropDownViewModel,
    app = global.app = global.app || {};

    DropDownViewModel = kendo.data.ObservableObject.extend({

      // accounts:["Select account","Overdue Normal Loans USD","Current Account Residence USD","Current Account Residence ILS","Cash Card USD"],
     //  accounts:["Select account","My loan account US$","My Current Account US$","My Current account JOD ","My Current account ILS","My Cash Card US$"],
         accounts:["اختار الحساب","حساب الديون دولار","حساب جاري دينار","حساب جاري دولار"],
        
      reasonOfStoppage:["Select Reason","Card was stolen","Card was Lost","Other"],
        cards:["My Credit Card  (MasterCard) US$","My Credit Card (Visa) US$","Master Card Gold USD","My Easy Life ILS"],
        
        mobileNumbers:["0596111111","0596222222","0596333333"],
        
        jawwalNumbers:["0599111111","0599222222","0599333333"],

      numberOfChequeBooks:["1","2","3"],
      
       chequeAccounts:["My loan account US$","My Current Account US$","My Current account ILS"],
 
       // chequeBooksType:["Select Type of Cheque-Book","Personal cheques 10 pages","Personal cheques 20 pages","Cheque Book with slip"],
       chequeBooksType:["اختار نوع االشيك","شيكات شخصية 10 صفحات","شيكات شخصية 20 صفحة ","Cheque Book with slip"],

        locationChoices:["صراف الي" , "فرع" , "جهاز تفويض الكتروني "],
        
        locationCities:["رام الله" , "غزة" , "الخليل"  , "بيت لحم"],
        
        currencies:["دولار امريكي","شاقل اسرائيلي","دينار اردني"],
        
        loansTypes:["قرض سيارة","قرض جامعة","قرض اقامة"],
        
        TransfersRecievers:["اختار المستقبل","Fadi Bataha USD account","Alaa Hawash ILS account","Mohammad Breighith JD","Saousan Hasan"],
         
        usdAccounts:["My loan account US$","My Current Account US$"],
        
        cashCardsAmount:[100, 200,300,500 , 1000],
         countries:["Jordan", "Israel" , "UAE" , "USA" ,"UK", "Germany"]  ,
        
        connectionType:["Telephone","Ethernet","GPRS"],
        
       // donationAccount:["Select account","Gaza" , "Al Yarmok Camp" ," Gaza 2" , "WFP "],
        
         donationAccount:["اختر الحساب","Gaza" , "Al Yarmok Camp" ," Gaza 2" , "WFP "],
        everylist:["Week","Month" , "Year" ],
        
        pCharge:"5$",
        
        setpCharge:function(x){
            that=this;
            that.set('pCharge',x);
            
        },
        
        amountToExchange:0,
        damountToExchange:0,
        
        fromcurrency:"",
        dfromcurrency:"",
        tocurrency:"",
        dtocurrency:"",
        rate:1,
        
        drate:1,
        
        tempFromValue:0,
        tempToValue:0,
        chequeBookFee:"",
        
        
        checkBookRequestCurrentAccount:"",
        
        mydate:new Date(),
        mydate2:new Date(),
        
        
        
        setChequeBookFee:function(text){
             that.set('chequeBookFee',text);
        },
        
         setFromValue:function(v){
           that.set('tempFromValue',v);
            
        },
        setdFromValue:function(v){
           that.set('tempdFromValue',v);
            
        }
        
        , setFromCurrency:function(v){
           that.set('tempToValue',v);
            
        },
        setdFromCurrency:function(v){
           that.set('dfromcurrency',v);
            
        },
        
        setFromCurrency:function(fc){
           that.set('fromcurrency',fc);
            
        },
        setToCurrency:function(fc){
           that.set('tocurrency',fc);
            
        },
        
        setRate:function(fc){
            console.log("exchange rate changed to"+fc);
           that.set('rate',fc);
            value=$("#money-exchange-input").val();
        console.log("value"+value);
            
        },
        
        setdRate:function(fc){
            console.log("exchange rate changed to"+fc);
           that.set('drate',fc);
           
            
        },
        setAmountToExchange:function(amount){
            
             that.set('amountToExchange',amount);
        },
        
        
        currentFromAccountBalance:0,
        currentFromAccountBalance2:0,
        currentdFromAccountBalance:0,
        currentdFromAccountBalance2:0,
        
        setCurrentAccountBalance:function(_value){
            
            that=this;
            that.set('currentFromAccountBalance',_value);
            
        },setCurrentdAccountBalance:function(_value){
            
            that=this;
            that.set('currentdFromAccountBalance',_value);
            
        },
        setCurrentAccountBalance:function(_value){
            
            that=this;
            that.set('currentFromAccountBalance',_value);
            
        },setCurrentdAccountBalance:function(_value){
            
            that=this;
            that.set('currentdFromAccountBalance',_value);
            
        },
        currentToAccountBalance:0,
        
        setCurrentToAccountBalance:function(_value){
            
            that=this;
            that.set('currentToAccountBalance',_value);
            
        }, 
        transferAmountChanged:function(){
            
           
            that=this;
             var x=document.getElementById("amount-to-exchange");
        am=that.rate*x.value;
        that.setAmountToExchange(am);
            
        },
        
        
        checkBookRequestCurrentAccountCurrency:"",
        
        setcheckBookRequestCurrentAccountCurrency:function(){},
        
        
        
        
        
        fromAccountManger:function(){ 
       
            console.log("run my function");
        that=app.dropDownService.viewModel;
        console.log("Change");
        fromC= that.fromcuurency;
        toC=that.tocuurency;
    
        
        var myselect = document.getElementById("accounts-list-drop-down");
 
        console.log(myselect.options[myselect.selectedIndex].index);
        
        _index=myselect.options[myselect.selectedIndex].index;
        switch (_index) {
           case(0):{
               that.setFromCurrency("");break
           }
            
            case(1): {
                    that.setCurrentAccountBalance(10015.75);
                    that.setFromCurrency("USD");
                }
                break;
            case(2): {
                    that.setCurrentAccountBalance(1700.00);
                    that.setFromCurrency("USD");
                }
                break;
            case(3): {
                    that.setCurrentAccountBalance(20.082);
                that.setFromCurrency("JOD");
                }
                break;
            case(4): {
                    that.setCurrentAccountBalance(5015.75);
                that.setFromCurrency("ILS");
                }
                break;
            case(5): {
                    that.setCurrentAccountBalance(100);
                that.setFromCurrency("USD");
                }
                break;
        }
        console.log("From "+that.fromcurrency+"To "+that.tocurrency);
        
        if(that.fromcuurency==="USD" && that.tocurrency==="USD"){
           alert();
                that.setRate(2);
            
            
        }
         x=that.fromcurrency;
        y=that.tocurrency;
        
        switch (x) {
            case("USD"): {
                    switch (y) {
                        case("USD"):
                            that.setRate(1);
                            break;
                        case("ILS"):
                            that.setRate(3.5);
                            break;
                        case("JOD"):
                            that.setRate(0.7);
                            break;
                    }
                }
                break;
            case("JOD"): {
                    switch (y) {
                        case("USD"):
                            that.setRate(1.41);
                            break;
                        case("ILS"):
                            that.setRate(4.91);
                            break;
                        case("JOD"):
                            that.setRate(1);
                            break;
                    }
                }
                break; 
            
            case("ILS"): {
                    switch (y) {
                        case("USD"):
                            that.setRate(0.28);
                            break;
                        case("ILS"):
                            that.setRate(4.91);
                            break;
                        case("JOD"):
                            that.setRate(0.20);
                            break;
                    }
                }
                break;
        }
        
       that.transferAmountChanged();
        
    
            
            
        }
        
        
        
    });

    app.dropDownService = {
        viewModel:new DropDownViewModel()  
  
    };
})(window);
