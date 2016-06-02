requirejs.config({
    paths: {
        'jquery': '../node_modules/jquery/dist/jquery',
        'ko': '../node_modules/knockout/build/output/knockout-latest'
    }
});

define('$', ['jquery'], function ($) {
    return $.noConflict( true );
});

require(['$', 'ko', 'viewModel'], function($, ko, viewModel) {
    $(document).ready(function() {
        ko.applyBindings(new viewModel('hello', 'hello'));
    })
});