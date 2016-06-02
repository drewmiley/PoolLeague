requirejs.config({
    paths: {
        'jquery': '../node_modules/jquery/dist/jquery',
        'ko': '../node_modules/knockout/build/output/knockout-latest'
    }
});

define('$', ['jquery'], function ($) {
    return $.noConflict( true );
});

require(['$', 'ko', 'appViewModel'], function($, ko, appViewModel) {
    $(document).ready(function() {
        ko.applyBindings(new appViewModel());
    })
});