define(function(require) {

  var Adapt = require('coreJS/adapt');

    var IntroView = Backbone.View.extend({
      initialize: function() {
        var template = Handlebars.templates.sideView;
        $('body').addClass('moodle-close');
        $('html').find('body').append(template());
        Adapt.trigger("sideView:loaded");
      },
    });

  Adapt.once('app:dataReady', function() {
    if (Adapt.course.attributes._sideView._isEnabled)
      new IntroView({});
  });

  Adapt.on("pageView:ready", function() {
    if (Adapt.course.attributes._sideView._isEnabled)
      Adapt.trigger("sideView:pageReady");
  });

  Adapt.on("menuView:ready", function() {
    if (Adapt.course.attributes._sideView._isEnabled)
      Adapt.trigger("sideView:menuReady");
  });

  Adapt.on('sideView:loadIframe', function(iframe, type, url) {
    document.getElementById(iframe + '-iframe').contentWindow.location.replace(url);
    $('.sideview-iframe-holder').addClass('loading-iframe');
    $('.' + iframe + '-iframe').on('load', function() {
      var adaptCSS = location.protocol + '//' + location.host + location.pathname;
      adaptCSS = adaptCSS.substring(0, adaptCSS.lastIndexOf('/'));
      adaptCSS += "/assets/adapt-" + type + ".css";
      $('.' + iframe + '-iframe').contents().find("head").append($("<link/>", {
        rel: "stylesheet",
        href: adaptCSS,
        type: "text/css"
      }));
      document.getElementById(iframe + '-iframe').contentWindow.window.onbeforeunload = null; // prevents error message when leaving moodle page when you haven't submitted.
      Adapt.trigger('sideView:removeLoading');
    });
  });

  Adapt.on('sideView:open', function() {
    $('body').addClass('moodle-open').removeClass('moodle-close');
    $('.sideview').removeClass('close').addClass('open');
  });

  Adapt.on('router:page router:menu', function() {
    Adapt.trigger('sideView:close');
  });


  Adapt.on('sideView:close', function() {
    $('.sideview').removeClass('open').addClass('close');
    $('body').removeClass('moodle-open').addClass('moodle-close');
    $('.moodle-launch-button.open').removeClass('open');
  });

  Adapt.on('sideView:removeLoading', function(iframe) {
    setTimeout(function() {
      $('.sideview-iframe-holder').removeClass('loading-iframe');
    }, 400);
  });

  $(".sideview-controls-close-button").on("click", function() {
    Adapt.trigger('sideview:close');
  });

  $(document).on('click', '.sideview-controls-close-button', function() {
    Adapt.trigger("sideView:close");
  });
});
