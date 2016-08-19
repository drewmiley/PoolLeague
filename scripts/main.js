requirejs.config({
    paths: {
        'jquery': '../lib/jquery.min',
        'ko': '../lib/knockout-latest'
    }
});

define('$', ['jquery'], function ($) {
    return $.noConflict( true );
});

require(['$', 'ko', 'viewModel'], function($, ko, viewModel) {
    $(document).ready(function() {
        ko.applyBindings(new viewModel());
    })
});