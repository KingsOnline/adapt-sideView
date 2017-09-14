define(function(require) {

  var Adapt = require('coreJS/adapt');

  var SideView = Backbone.View.extend({

    initialize: function() {
      var template = Handlebars.templates.sideView;
      $('body').addClass('sideview-close');
      $('html').find('body').append(template());
      var model = this.model;

      Adapt.trigger("sideView:loaded");

      Adapt.once("pageView:preRender menuView:preRender", function() {
        if (model._run._isEnabled) {
          Adapt.trigger("sideView:appendRun", model._run._routeAddress, model._run._number);
        }
      });

      Adapt.on("pageView:ready", function() {
        Adapt.trigger("sideView:pageReady");
      });

      Adapt.on("menuView:ready", function() {
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
          document.getElementById(iframe + '-iframe').contentWindow.window.onbeforeunload = null; // prevents error message when leaving sideview page when you haven't submitted.
          Adapt.trigger('sideView:removeLoading');
        });
      });

      Adapt.on('sideView:open', function() {
        $('body').addClass('sideview-open').removeClass('sideview-close');
        $('.sideview').removeClass('close').addClass('open');
      });

      Adapt.on('router:page router:menu', function() {
        $('.sideview').removeClass('open').addClass('close');
        $('body').removeClass('sideview-open').addClass('sideview-close');
      });


      Adapt.on('sideView:close', function() {
        $('.sideview').removeClass('open').addClass('close');
        $('body').removeClass('sideview-open').addClass('sideview-close');
      });

      Adapt.on('sideView:removeLoading', function(iframe) {
        setTimeout(function() {
          $('.sideview-iframe-holder').removeClass('loading-iframe');
        }, 400);
      });

      $(document).on('click', '.sideview-controls-close-button', function() {
        Adapt.trigger("sideView:close");
      });

    }

  });

  Adapt.once('adapt:initialize', function() {
    console.log('sideView preRender');
    if (Adapt.course.get('_sideView')._isEnabled)
      new SideView({
        model: Adapt.course.get('_sideView')
      });
  });
  return SideView;
});
