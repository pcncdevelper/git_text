(function(global){
    console.log("activationService");
    
    var ActivationViewModel , 
    app = global.app || golobal.app || {} ;
    
    
    ActivationViewModel = kendo.data.ObservableObject.extend({
        activated : false, 
        activationCode : null,
        
        
        checkTokenValue:function(){
            this=that;
            if(typeof(that.getTokenValue())==='undefined')
            { 
                setTokenValue("emptyToken");
            }
            
        },
        
        setTokenValue:function(tokenNewValue){
            localStorage.setItem("localStorageToken",tokenNewValue);
        },
        
        getTokenValue:function(){
            return localStorage.localStorageToken;
        },
        
        clearTokenValue:function(){
          localStorage.clear();  
        },
        
        sumbitActivationCode:function(){console.log("sumbitActivationCode-clicked")
           that=this;
           
            enteredActivationCode = that.get("activationCode")
          
         
            console.log("activation clicked");
            
             $.ajax({
                type:"POST",
                url:"http://mail.pcnc2000.com:8081/mb-server/api/api/checkActivationCode",
                dataType:"json",
                data:{activationCode:enteredActivationCode},
                success:function(data){
                    
                    
                     if(data.correctActivationCode === true)
                    {
                         console.log("my-data"+"user"+data.last_name);
                        app.loginService.viewModel.setFname(data.first_name);
                               app.loginService.viewModel.setLname(data.last_name);
                        
                        alert("right activation Code  ==> "+data.token)
                        localStorage.setItem("localStorageToken",data.token);
                       // app.application.navigate("views/accountsView.html");
                        app.application.navigate("views/dashBoardView.html");
                        
                         // get the value of token and save it 
                        // navigate to Home screen .. 
                    }
                    //tofix activation code
                    else
                    {
                        navigator.notification.alert("Wrong Activation Code");
                    }
                }
                               
            })
        },
        
        requestSMS:function(){
            
             $.ajax({
                type:"GET",
                url:"http://mail.pcnc2000.com:8081/mb-server/api/api/activation",
                dataType:"json",
               
                success:function(data){
                    
                    alert("your activation code for your number : "+data.mobileNumber+" is : "+data.activationCode);
                      console.log("activationCode");
                      console.log(data.activationCode);
                     
                }
            })
            
        },
        
       /* checkActivationCode:function(){
            that=this; 
            if(that.get("activationCode")==="0000")
           { console.log("checked")
            console.log(that.get("activationCode"));
               
           }
           else
           {
                alert("wrong activation Code") 
                
           }
        }*/
    });
    
    
    // set Token to emptyToken if token is undefined 
     if(typeof(localStorage.localStorageToken)=='undefined')
            { 
                console.log("Token is undefined");
                localStorage.setItem("localStorageToken","emptyToken");
            }
    
    
    app.activationService ={viewModel : new ActivationViewModel()};
          
          
})(window);