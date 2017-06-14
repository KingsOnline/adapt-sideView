define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');
  var myNotesView = require('extensions/adapt-myNotes/js/adapt-myNotesView');
  // var copyNotes = require('extensions/adapt-myNotes/js/copyToNotes');

  Adapt.once('app:dataReady', function() {
    console.log('app ready notes');
    if (!Adapt.iframe)
      createIframeHolder();
  });

  Adapt.once('adapt:start', function() {
    console.log('adapt:start');
    createNotesManager();
    createPostNote();
  });

  Adapt.on('pageView:postRender', function() {
    console.log('pageview:preRender');
    loadMyNotes();
  });

  // Adapt.on('menuView:postRender', function() {
  //   console.log('menuView:preRender');
  //   loadMyNotes();
  // });

  function loadMyNotes() {
    console.log('create');
    if (Adapt.course.attributes._myNotes._isEnabled === true) {
      new myNotesView({
        model: new Backbone.Model()
      });
    }
  }

  function createNotesManager() {
    $('.moodle-iframe-holder').append("<div class='notesManager'><iframe name='notesManager-iframe' id='notesManager-iframe' class='notesManager-iframe'></iframe><button class='newNote-button'>Create new Note</button></div>");
  }

  function createPostNote() {
    $('.moodle-iframe-holder').append("<div class='newNote hidden'><iframe name='newNote-iframe' id='newNote-iframe' class='newNote-iframe'></iframe><button class='postNote-button'>Post Note</button></div>");
  }

  function createIframeHolder() {
    $('html').append("<div class='moodle-view close'><div class='iframe-controls-bar'><div class='iframe-controls-title' /><button class='moodle-close-button icon icon-cross'></button></div><div class='moodle-iframe-holder'></div></div>");
    $('body').addClass('moodle-close');
    Adapt.iframe = true;
  }
});
