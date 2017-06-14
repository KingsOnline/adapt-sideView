define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');

  var myNotesView = Backbone.View.extend({

    className: "myNotes",

    initialize: function(blockModel) {
      this.listenTo(Adapt, 'remove', this.remove);
      var data = this.model.toJSON();

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
    }
  });

  return myNotesView;
});
