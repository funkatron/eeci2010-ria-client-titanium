if (!window.app) {
    window.app = {};
}

if (!app.controller) {
    app.controller = {};
}

/*
    bind initial listeners
*/
app.controller.init = function() {

    this.setupWindowDrag();
    
    /*
        listen for ENTER on postbox
    */
    $('#postbox').bind('keydown', function(e) {
        if (e.keyCode == 13) {
            var msg = $.trim($(this).val());
            if (msg.length > 0) {
                app.model.post(msg);
                app.view.clearPostBox();
            }
            return false;
        }
        return true;
    });
    
    /*
        load initial posts into model
    */
    app.model.getPosts();
};

app.controller.setupWindowDrag = function() {
    
    // var cursorPosition = [];
    // 
    // /*
    //     setup window dragging on titlebar
    // */
    // function onWindowDrag(event) {
    //     console.log('DRAGGING');
    //     console.log(event);
    //     if (event.type == "mousedown") {
    //         cursorPosition = [event.clientX, event.clientY];
    //         $(document).bind("mousemove", onWindowMove);
    //     } else if (event.type == "mouseup" || event.type == "mouseout") {
    //         $(document).unbind("mousemove", onWindowMove);
    //     }
    // }
    // 
    // function onWindowMove(event) {
    //     
    //     window.moveTo(event.screenX-cursorPosition[0], event.screenY-cursorPosition[1]);
    // }    
    // 
    // $(document).bind('mousedown', onWindowDrag);
    // $(document).bind('mouseup', onWindowDrag);
    // $(document).bind('mouseout', onWindowDrag);
    // // $(document).css('-webkit-user-select', 'none');
    // 
    // var dragging = false;
    // 
    // var titlebar = $('h1').get(0);
    // 
    // titlebar.onmousemove = function(event) {
    //     if (!dragging)
    //             return;
    // 
    //     Titanium.UI.currentWindow.setX(Titanium.UI.currentWindow.getX() + event.clientX - xstart);
    //     Titanium.UI.currentWindow.setY(Titanium.UI.currentWindow.getY() + event.clientY - ystart);
    // };
    // 
    // titlebar.onmousedown = function(event) {
    //         dragging = true;
    //         xstart = event.clientX;
    //         ystart = event.clientY;
    // };
    // 
    // titlebar.onmouseup = function(event) {
    //         dragging = false;
    // };
};