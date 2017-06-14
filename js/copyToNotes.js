define(function(require) {

  var Adapt = require('coreJS/adapt');
  var selected;

  Adapt.on("pageView:ready", function() {
    console.log('copyNotes');
    createCopyBox();
    $('.component').bind('mouseup', function(e) {
      var selection;
      if (window.getSelection) {
        selection = window.getSelection();
        copyPrompt(e, selection);
      } else if (document.selection) {
        selection = document.selection.createRange();
        // copyPrompt(e, selection);
      }
    });
  });

  function createCopyBox() {
    $('#wrapper').append("<div class='copy-box'><button class'copy-box-button icon-save icon'><i class='icon icon-save'/>Hello box</button></div>");
    $('body').on('click', '.copy-box', function() {
      copyAcross();
    });
  }



  function copyAcross() {
    var frameContents = $(".notesManager-iframe").contents();
    if (frameContents.find('#id_messageeditable').text() == '') {
      frameContents.find('#id_messageeditable').append(selected);
    } else {
          frameContents.find('#id_messageeditable').append("<br><br>" + selected);
    }
  }

  function copyPrompt(e, selection) {
    if (selection.toString() == '') {
      hideBox();
    } else {
      selected = selection.toString();
      console.log('"' + selection.toString() + '" was selected at ' + e.pageX + '/' + e.pageY);
      console.log(selection);
      console.log(e);
      console.log(e.toElement);
      var $element = $(e.toElement);
      var $selected = $('.component:contains("' + selection.toString() + '")').css('background-color', 'red');
      var position = $element.position();
      console.log(e.pageX);
      console.log(e.pageY);
      showBox(e.pageX, e.pageY);
    }
  }

  function hideBox() {
    $('.copy-box').hide();
  }

  function showBox(x, y) {
    $('.copy-box').show();
    $('.copy-box').css({
      "left": x,
      "top": y + 10
    })
  }

});
