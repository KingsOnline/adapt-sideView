define(function(require) {

  var Adapt = require('coreJS/adapt');

  function createIframeHolder() {
    $('body').append("<div class='sideview close'><div class='sideview-controls'><div class='sideview-controls-title' /><button class='sideview-controls-close-button icon icon-cross'></button></div><div class='sideview-iframe-holder' /></div>");
    $('body').addClass('moodle-close');
  }

  Adapt.once('app:dataReady', function() {
    if (Adapt.course.attributes._sideView._isEnabled)
      createIframeHolder();
  });

  Adapt.once('adapt:start', function() {
    if (Adapt.course.attributes._sideView._isEnabled)
      Adapt.trigger("sideView:loaded");
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
    document.getElementById(iframe + '-iframe').src = url;
    $('.sideview-iframe-holder').addClass('loading-iframe');
    $('.' + iframe + '-iframe').on('load', function() {
      var adaptCSS = location.protocol + '//' + location.host + location.pathname;
      adaptCSS = adaptCSS.substring(0, adaptCSS.lastIndexOf('/'));
      adaptCSS += "/assets/adapt-" + type + ".css"
      $('.' + iframe + '-iframe').contents().find("head").append($("<link/>", {
        rel: "stylesheet",
        href: adaptCSS,
        type: "text/css"
      }));
      document.getElementById(iframe + '-iframe').contentWindow.window.onbeforeunload = null; // prevents error message when leaving moodle page when you haven't submitted.
    });
  });

  Adapt.on('sideView:open', function() {
    console.log("sideView:open");
    $('body').addClass('moodle-open').removeClass('moodle-close');
    $('.sideview').removeClass('close').addClass('open');
    $(".sideview-controls-close-button").on("click", function() {
      Adapt.trigger('sideview:close');
    });
  });

  Adapt.on('sideView:close', function() {
    console.log("sideView:close");
    $('.sideview').removeClass('open').addClass('close');
    $('body').removeClass('moodle-open').addClass('moodle-close');
    $('.moodle-launch-button.open').removeClass('open');
  });

  Adapt.on('sideView:removeLoading', function(iframe) {
    console.log('finished loading');
    setTimeout(function() {
      $('.sideview-iframe-holder').removeClass('loading-iframe');
    }, 400);
  });

  $(document).on('click', '.sideview-controls-close-button', function() {
    Adapt.trigger("sideView:close");
  });
});
