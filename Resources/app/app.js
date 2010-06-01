if (!window.app) {
    window.app = {};
}

/*
    
*/
app.init = function() {
    app.controller.init();
    app.view.init();
};

/*
    bootstrapper
*/
$(document).ready(function() {
    

    
    app.init();

    
});