define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');
  var sideviewView = require('extensions/adapt-sideView/js/adapt-sideView-view');
  // var copyNotes = require('extensions/adapt-myNotes/js/copyToNotes');

  Adapt.once('app:dataReady', function() {
    console.log('app ready notes');
      createIframeHolder();
  });

  Adapt.on('adapt:start', function() {
    console.log('adapt:start');
      Adapt.trigger("sideView:ready");
      new sideviewView({
        model: new Backbone.Model()
      });
  });

  $(document).on('click', '.moodle-close-button', function() {
    Adapt.trigger("sideView:close");
  });

  function createIframeHolder() {
    $('html').append("<div class='moodle-view close'><div class='iframe-controls-bar'><div class='iframe-controls-title' /><button class='moodle-close-button icon icon-cross'></button></div><div class='moodle-iframe-holder'></div></div>");
    $('body').addClass('moodle-close');
  }
});
