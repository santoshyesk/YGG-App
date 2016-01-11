/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        ons.setDefaultDeviceBackButtonListener(function() {
            if (navigator.notification.confirm("Are you sure to close the app?", 
                function(index) {
                    if (index == 1) { // OK button
                        navigator.app.exitApp(); // Close the app
                    }
                }
            ));
        });

        // Open any external link with InAppBrowser Plugin
        $(document).on('click', 'a[href^=http], a[href^=https]', function(e){

            e.preventDefault();
            var $this = $(this); 
            var target = $this.data('inAppBrowser') || '_blank';

            window.open($this.attr('href'), target);

        });
        
        // Initialize Push Notifications
        // Uncomment the following initialization when you have made the appropriate configuration for iOS - http://goo.gl/YKQL8k and for Android - http://goo.gl/SPGWDJ
        //app.initPushwoosh();
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Register device for Push Notifications
    initPushwoosh: function() {
        var pushNotification = window.plugins.pushNotification;

		if(device.platform == "Android") {
			registerPushwooshAndroid();
		}
        if (device.platform == "iPhone" || device.platform == "iOS") {
            registerPushwooshIOS();
        }
    }
    
};

(function() {
    var app = angular.module('yggApp', ['onsen.directives']);
    
    // Home Controller
    app.controller('LoginController', function($scope, Data) {
        
        $scope.items = Data.items;

        $scope.showDetail = function(index){
            var selectedItem = $scope.items[index];
            Data.selectedItem = selectedItem;
            $scope.ons.navigator.pushPage(selectedItem.page, {title: selectedItem.title, animation: 'slide'});
        }
		
		logincheck = function() {
			
			var access = document.getElementById("accesscode").value; 
			
			$.ajax({
				url: "http://ec2-54-144-197-87.compute-1.amazonaws.com/appservice/event/"+access,
				type: "GET",
				dataType: "text",
				success: function (data) {					
					  if(data==0){	 
					   ons.notification.alert({
								  message: 'Invalid Login'
								});
					  } 
					  else{
					 	  var t = JSON.parse(data);		
						  var id = t['id']; 
						  var code = t['code']; 
		                  var name = t['name']; 
						  var npoID = t['npoID']; 
						  if(typeof(Storage)!=="undefined")
						  {
							  localStorage.setItem("eventid", id);
							  localStorage.setItem("eventcode", code);
							  localStorage.setItem("eventname", name);
							  	var url = 'products.html'; 
								$(location).attr('href',url);    
								
							  
						  }
					  }
				},
				error: function () {					
					   ons.notification.alert({
								  message: 'Invalid Login'
								});
				}
			});
			
		 
		};
        
    });
	
	// Products Controller
    app.controller('ProductsController', function($scope, Data, $http) {

        var apiurl= "http://ec2-54-144-197-87.compute-1.amazonaws.com/appservice/getEventProducts/";
        $scope.items = Data.items;

        $scope.showDetail = function(index){
            var selectedItem = $scope.items[index];
            Data.selectedItem = selectedItem;
            $scope.ons.navigator.pushPage(selectedItem.page, {title: selectedItem.title, animation: 'slide'});
        }
		
		var eventid = localStorage.getItem('eventid');
		$http({method: 'GET', url: apiurl+eventid}).success(function(data){
				$scope.productlist = data.products;
		});
			        
    });
    
    

})();