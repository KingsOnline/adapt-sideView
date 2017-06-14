define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');

  var myNotesView = Backbone.View.extend({

    className: "myNotes",

    initialize: function(blockModel) {
      this.listenTo(Adapt, 'remove', this.remove);
      var data = this.model.toJSON();
      var template = Handlebars.templates.myNotes;
      this.setElement(template(data)).$el.appendTo($(".navigation-inner"));
      this.listenTo(Adapt, {
        "navigation:openMyNotes": this.launchButton
      });

      this.reloadIframes();

      var context = this;

      $(document).on('click', '.postNote-button', function() {
        context.postNewNote();
      });

      $(document).on('click', '.newNote-button', function() {
        console.log('e');
        context.showNewNote();
      });
    },

    loadPage: function(iframe) {
      document.getElementById(iframe + '-iframe').src = Adapt.course.attributes._myNotes['_' + iframe];
      console.log('Applying CSS to ' + iframe);
      $('.moodle-iframe-holder').addClass('loading-iframe');
      $('.' + iframe + '-iframe').on('load', function() {
        var adaptCSS = location.protocol + '//' + location.host + location.pathname;
        adaptCSS = adaptCSS.substring(0, adaptCSS.lastIndexOf('/'));
        adaptCSS += "/assets/adapt-" + iframe + ".css"
        $('.' + iframe + '-iframe').contents().find("head").append($("<link/>", {
          rel: "stylesheet",
          href: adaptCSS,
          type: "text/css"
        }));
        document.getElementById(iframe).contentWindow.window.onbeforeunload = null; // prevents error message when leaving moodle page when you haven't submitted.
      });
    },

    launchButton: function(event) {
      console.log($('.moodle-iframe').hasClass('hidden'));
      if ($('.moodle-view').hasClass('open') && !$('.notesManager').hasClass('hidden')) {
        this.closeIframe(event); // close
      } else {
        this.openIframe(event);
      }
      this.showNotesManager();
    },

    showNewNote: function(event) {
      $('.newNote').removeClass('hidden');
      $('.newNote').siblings().addClass('hidden');
      $('.iframe-controls-title').text('New note');
    },

    showNotesManager: function(event) {
      $('.notesManager').removeClass('hidden');
      $('.notesManager').siblings().addClass('hidden');
      $('.iframe-controls-title').text('My notes');
    },

    reloadIframes: function(event) {
      this.loadPage('notesManager');
      this.loadPage('newNote');
      setTimeout(function() {
        console.log('finished loading');
        $('.moodle-iframe-holder').removeClass('loading-iframe');
      }, 500);
    },

    postNewNote: function(event) {
      $('.newNote-iframe').contents().find('#id_submitbutton').trigger("click");
      var context = this;
      setTimeout(function() {
        context.showNotesManager();
        context.reloadIframes();
      }, 500);

    },

    openIframe: function(event) {
      $('body').addClass('moodle-open').removeClass('moodle-close');
      $('.moodle-view').removeClass('close').addClass('open');
      var context = this;
      $(".moodle-close-button").on("click", function() {
        context.closeIframe();
      });
    },

    closeIframe: function(event) {
      $('.moodle-view').removeClass('open').addClass('close');
      $('body').removeClass('moodle-open').addClass('moodle-close');
      $('.moodle-launch-button.open').removeClass('open');
    }
  });

  return myNotesView;
});
