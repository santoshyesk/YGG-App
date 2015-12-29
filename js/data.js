var yggApp = angular.module('yggApp');

// Home Data: Home page configuration
yggApp.factory('Data', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Products',
            icon: 'shopping-cart',
            page: 'products.html'
        }

    ]; 
    
    return data;
});

// Menu Data: Menu configuration
yggApp.factory('MenuData', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Home',
            icon: 'home',
            page: 'login.html'
        },
        { 
            title: 'Modal View',
            icon: 'square-o',
            page: 'modal.html'
        },
        { 
            title: 'Grid',
            icon: 'th',
            page: 'grid.html'
        },
        { 
            title: 'Login',
            icon: 'sign-in',
            page: 'login.html'
        }

    ]; 
    
    return data;
});

