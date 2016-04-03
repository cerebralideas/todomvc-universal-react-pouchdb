"use strict";
var page = require("page");
page.base('/basic');
page('/', index);
page('/about', about);
page('/contact', contact);
page('/contact/:contactName', contact);
page('/contact/inline/:contactName', function (ctx) { });
page();
var index = function () {
    document.querySelector('p')
        .textContent = 'viewing index';
};
var about = function () {
    document.querySelector('p')
        .textContent = 'viewing about';
};
var contact = function (ctx) {
    document.querySelector('p')
        .textContent = 'viewing contact ' + (ctx.params.contactName || '');
};
var avatars = {
    glottis: 'http://homepage.ntlworld.com/stureek/images/glottis03.jpg',
    manny: 'http://kprojekt.net/wp-content/uploads/manny.jpg',
    sal: 'http://homepage.ntlworld.com/stureek/images/sal01.jpg'
};
page.base('/state');
page('/', index2);
page('/user/:name', load, show);
page('*', notfound);
page();
function text(str) {
    document.querySelector('p').textContent = str;
}
function index2() {
    text('Click a user below to load their avatar');
    document.querySelector('img')
        .style.display = 'none';
}
var load = function (ctx, next) {
    if (ctx.state.avatar) {
        ctx['avatar'] = ctx.state.avatar;
        next();
        return;
    }
    setTimeout(function () {
        ctx.state.avatar = ctx['avatar'] = avatars[ctx.params.name];
        ctx.save();
        next();
    }, 600);
};
var show = function (ctx) {
    var img = document.querySelector('img');
    img.src = ctx['avatar'];
    img.style.display = 'block';
    text('Showing ' + ctx.params.name);
};
function notfound() {
    document.querySelector('p')
        .textContent = 'not found';
}
//# sourceMappingURL=page-tests.js.map