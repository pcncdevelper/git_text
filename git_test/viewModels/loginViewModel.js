(function (global) {
     console.log("loginService");
    var LoginViewModel,
        app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "",
        password: "",
        fname:"Ali2",
        lname:"Khalid",
        lastLoginDate:new Date().toDateString(),
       
        clearStorage:function(){
            localStorage.clear();
        },
        
        
        setFname:function(firstN){
            that=this;
            that.set('fname',firstN);
        },
        
        
        setLname:function(lastN){
            that=this;
            that.set('lname',lastN);
        },
        
        onLogin: function () {
            app.application.navigate("views/dashBoardView.html");
            var test = app.activationService.viewModel.getTokenValue();
                 
                 console.log("test()");
                console.log(test);
                /*localStorage.setItem("token","tokentestvalue"); 
                //localStorage.clear()*/
                
                var that = this,
                username = that.get("username").trim(),
                password = that.get("password").trim();

               
            
                console.log("username");
                console.log(username);
              
            var tok = localStorage.localStorageToken;
          
            if(username !=="" && password !==""){
            $.ajax({
                type:"POST",
                url:"http://192.168.0.22/mb-server/api/api/auth",
                dataType:"json",
                data:{username:username,password:password,token:tok},
                success:function(data){
                    
                    console.log(data.authenticated);
                     if(data.authenticated === 'true'){
                         
                         if(app.activationService.viewModel.getTokenValue()==="emptyToken")
                         {
                             console.log("i c empty token");
                              app.application.navigate("views/activationView.html");
                         }
                        
                         else if(data.authenticated === 'true')
                           { 
                               console.log("my-data"+"user"+data.last_name);
                               
                               app.loginService.viewModel.setFname(data.first_name);
                               app.loginService.viewModel.setLname(data.last_name);
                               
                               
                           // app.application.navigate("views/homeView.html");
                           // app.application.navigate("views/accountsView.html");
                               
                            app.application.navigate("views/dashBoardView.html");
                           }
                        
                     }
                    else
                    { navigator.notification.alert("Wrong UserName/Password entered!")}
                },
                      error: function(xhr, textStatus, errorThrown){
                   alert('request failed-error in server');
                      }
               
                
                
                
            })
             that.clearForm();
        
            }
        else
        {
            alert("both fields are required");
        }
            }
        ,

        onLogout: function () {
            var that = this;

            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        },

        checkEnter: function (e) {
            var that = this;

            if (e.keyCode == 13) {
                $(e.target).blur();
                that.onLogin();
            }
        }
    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);














  
            
           // app.application.navigate("views/homeView.html");
       
         //   app.application.navigate("views/balanceInquiryView.html");
        /* to change /*
          /*  alert("device Ready");
        function onSuccess(contacts) {
            alert('Found ' + contacts.length + ' contacts.');
        };

        function onError(contactError) {
            alert('onError!');
        };

        // find all contacts with 'Bob' in any name field
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields, onSuccess, onError, options);
            */
            
            
            
            
            /* Old Login /*
          /*  $.ajax({
		           type: "POST",
		           url: "http://localhost/mb-server1/index.php/test/authenticate",
		          // url: "http://192.168.0.22/mb-server/auth/login",
                    dataType:"json",
			        data: {username:username},
		           
                    success: function(data){
                       
                        
                        
                       if(data){
                       console.log("data");
                       console.log(data);
                           
                           
                       //console.log(data.user.password);
                       }
                              if(data.success === true && data.user.password===password){
                                 
                                  that.set("fname",data.user.fname);
                                  that.set("lname",data.user.lname);
                                app.application.navigate("views/homeView.html");
                                  alert("success");
                        that.set("isLoggedIn", true);
                              }
                                   else 
                                    navigator.notification.alert("Wrong UserName/Password entered!",
                    function () { }, "Login failed", 'OK');
                      
                   }
                });
                        
            */
          /*  if (username === "" || password === "") {
                navigator.notification.alert("Both fields are required!",
                    function () { }, "Login failed", 'OK');

                return;
            }*/
