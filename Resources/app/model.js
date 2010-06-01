if (!window.app) {
    window.app = {};
}

if (!app.model) {
    app.model = {};
}

/*
    
*/
app.model.post = function(text) {
    $.post(
        'http://revolverocelot.local/~coj/eeci2010/index.php/microblog/post',
        {'text':text},
        function(data) {
            app.model.addPostToModel(data);
            app.view.updateList();
        }
    );
    
};

/*
    
*/
app.model.getPosts = function(since_id) {
    $.get('http://revolverocelot.local/~coj/eeci2010/index.php/microblog/getAll', function(data) {
        app.model.data = data;
        app.view.updateList();
    });
};


app.model.addPostToModel = function(post) {
    app.model.data.posts.unshift(post);
};

/*
    posts array
*/
app.model.posts = [];