(function($){
	

	// Plugin Defaults
	var defaults = {  
		posTop: 300,
		displayText: 'Processing',
		action: 'initialize'
	},
	options = {};

	$.modalLoader = function(action, new_options){
			
	    // Copy over new options
	    function setOptions(new_options) {
    		options = $.extend(defaults, new_options);
  		}

	    if (typeof(action) == 'object') {
	      new_options = action;
	    } else if (typeof(action) == 'string') {
	    	new_options = {};
	    	new_options.action = action;
	    }

	    // Extend new_options
	    setOptions(new_options);

		// Run on each passed selector
		if (options.action == 'initialize') {

			// Added check routine to ensure only one modal is loaded at a time.
			if (!document.getElementById('modal-background')) {

				$('<div></div>').appendTo('body')
					.attr('id','modal-background')
					.css({'width':$(document).width(),'height':$(document).height()});	
					
				// Create a new popup window.
				$('<div></div>').appendTo('body')
					.attr('id','modal-div')
					.css({'top':options.posTop,'left':(($(window).width() / 2) - ($('#modal-div').width() / 2))});
					
				// Create the mediaspace area in new-player-modal.
				$('<div></div>').appendTo('#modal-div')
					.attr('id','loading-div');
				
				$('#loading-div').append('<img src="'+ ux.core.resourcePath + '/images/loading.gif" />');
				$('<p></p>').appendTo('#loading-div');
				$('#loading-div p').append( options.displayText );
				
				// Scroll user to appropriate position
				$('html, body').animate({ scrollTop: scrollTo }, 'fast'); 
			}

		} else if (options.action == 'close') {
			//alert('close');
			$('#modal-background').remove();
			$('#modal-div').remove();

			// Prep the modal loader options in case it needs to be loaded again on the same page.
			options.action = 'initialize';
		}
	}

})( jQuery );