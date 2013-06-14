/*global jQuery */
/*!
* Glid 1.0
*
* Copyright 2013, Hampus Persson - http://hampuspersson.se
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.glid = function( options ) {

    // Set som default params
    var settings      = {

      //transition parameters
      animtype        : 'fade',
      animduration    : 400,
      animspeed       : 5000,
      automatic       : true

    };

    // If the user has set her own options they will be appended to the default ones
    if ( options ) {
      $.extend( defaults, options );
    }

    var slider        = this,
        slides        = slider.children('li'),

        ctrl_wrapper  = null,
        ctrl_next     = null,
        ctrl_prev     = null;

    // Variables relating to the state of Glid
    var state         = {

      slidecount      : slides.length - 1, // Index is zero-based, let's make slidecount compatible
      currentindex    : 0,
      nextindex       : 0,
      animating       : false,

    };

    var init = function() {

      // Add classes to all items that are to be a part of the slider
      slider.wrap('<div class="glid_wrapper">');
      slides.addClass('glid__item');
      // Show the first item in the slider
      slides.eq(state.currentindex).fadeIn(settings.animduration);

      // Setup timer to assure that the first image is loaded before the controls are loaded.
      // Height must be set so that the controls can be positionend below
      var img_load_timer = setInterval( function() {
        if( slides.eq(state.currentindex).children('img').height() ) {
          clearInterval( img_load_timer );
          slider.height( slides.eq(state.nextindex).height() );
          init_controls();
        }
      }, 100);
    };

    var init_controls = function () {

      // Setup the controllers
      ctrl_wrapper  = $('<ul class="glid-controls"></ul>');
      ctrl_prev     = $('<li class="glid-controls__item"><a href="#" data-direction="prev">Previous</a></li>');
      ctrl_next     = $('<li class="glid-controls__item"><a href="#" data-direction="next">Next</a></li>');

      // Bind controller click event
      ctrl_wrapper.on('click', 'a', function(e) {

        e.preventDefault();
        var direction = $(this).attr('data-direction');

        run_animation( direction );

      });

      // Add controllers to DOM
      ctrl_prev.appendTo( ctrl_wrapper );
      ctrl_next.appendTo( ctrl_wrapper );
      ctrl_wrapper.insertAfter( slider );

    };

    var run_animation = function( direction ) {

      // Don't animate unless we're ready!
      if( !state.animating ) {
        state.animating = true;

        // Advance index
        if( direction === 'next' ) {
          state.nextindex = state.currentindex + 1;
        } else if( direction === 'prev' ) {
          state.nextindex = state.currentindex - 1;
        }

        // Make sure that nextindex isn't out of bounds and if it is, reset it.
        if( state.nextindex < 0 )  {
          state.nextindex = state.slidecount;
        } else if( state.nextindex > state.slidecount ) {
          state.nextindex = 0;
        }

        // Hide current slide and display next
        slides.eq(state.currentindex).fadeOut(settings.animduration);
        slides.eq(state.nextindex).fadeIn(settings.animduration);

        // Animate the height change of the slider to make sure the controls are moved
        slider.animate( {
          height: slides.eq(state.nextindex).height()
        });

        // Reset states for next animation
        state.currentindex  = state.nextindex;
        state.animating     = false;
      }
    };

    // Start Glid
    init();

  };

})( jQuery );