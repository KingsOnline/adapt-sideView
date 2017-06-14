define(function(require) {

  var Adapt = require('coreJS/adapt');

  function createIframeHolder() {
    $('html').append("<div class='moodle-view close'><div class='iframe-controls-bar'><div class='iframe-controls-title' /><button class='moodle-close-button icon icon-cross'></button></div><div class='moodle-iframe-holder'></div></div>");
    $('body').addClass('moodle-close');
  }

  Adapt.once('app:dataReady', function() {
    console.log('app ready notes');
    createIframeHolder();
  });

  Adapt.on('adapt:start', function() {
    Adapt.trigger("sideView:ready");
  });

  Adapt.on('sideView:loadIframe', function(iframe, type, url) {
    document.getElementById(iframe + '-iframe').src = url;
    $('.moodle-iframe-holder').addClass('loading-iframe');
    $('.' + iframe + '-iframe').on('load', function() {
      var adaptCSS = location.protocol + '//' + location.host + location.pathname;
      adaptCSS = adaptCSS.substring(0, adaptCSS.lastIndexOf('/'));
      adaptCSS += "/assets/adapt-" + type + ".css"
      $('.' + iframe + '-iframe').contents().find("head").append($("<link/>", {
        rel: "stylesheet",
        href: adaptCSS,
        type: "text/css"
      }));
      document.getElementById(iframe).contentWindow.window.onbeforeunload = null; // prevents error message when leaving moodle page when you haven't submitted.
    });
  });

  Adapt.on('sideView:open', function() {
    console.log("sideView:open");
    $('body').addClass('moodle-open').removeClass('moodle-close');
    $('.moodle-view').removeClass('close').addClass('open');
    $(".moodle-close-button").on("click", function() {
      Adapt.trigger('sideview:close');
    });
  });

  Adapt.on('sideView:close', function() {
    console.log("sideView:close");
    $('.moodle-view').removeClass('open').addClass('close');
    $('body').removeClass('moodle-open').addClass('moodle-close');
    $('.moodle-launch-button.open').removeClass('open');
  });

  Adapt.on('sideView:removeLoading', function(iframe) {
    setTimeout(function() {
      console.log('finished loading');
      $('.moodle-iframe-holder').removeClass('loading-iframe');
    }, 500);
  });

  $(document).on('click', '.moodle-close-button', function() {
    Adapt.trigger("sideView:close");
  });
});
