(function($){
	
	// Create the plugin
	$.fn.popover = function(options) {


		// defaults
		var defaults = {
			bEnsurePlacement: true,
			iSidePadding: 5,
			iTopPadding: 10,
			placementFunction: function(link, submenu, defaults) {

				// Setup preset variables
				var containWidth = 0,
				containHeight = 0;

				// Window width
				var windowWidth = $(window).width(),
				windowHeight = $(window).height();

				// Get information regarding the submens relative container
				var relParent = link.offsetParent(),
				relParentWidth = relParent.outerWidth(),
				relParentHeight = relParent.outerHeight();

				// Get information regarding the submenu
				var subMenuWidth = submenu.outerWidth(),
				subMenuHeight = submenu.outerHeight(),
				subMenuHalf = subMenuWidth/2,
				subPosCenterLeft = 0,
				subPosCenterRight = 0;

				// Get element (link) location
				var linkPos = link.position(),
				linkPosLeft = linkPos.left,
				linkPosTop = linkPos.top;
				linkHalf = link.outerWidth()/2;
				linkPosCenter = 0;

				// Determine if the window
				if (defaults.bEnsurePlacement) {

					// Determine which is smaller and scale to that window.
					if (windowWidth < relParentWidth) {
						
						// We will use the window since its smaller and ensure we are in the view.
						containWidth = windowWidth;
						containHeight = windowHeight;

					} else {

						// We are going to use the relative container because it is smaller
						containWidth = relParentWidth;
						containHeight = relParentHeight;

					}

				} else {

					// We are not ensureing placement agaist the window so just use the container
					containWidth = relParentWidth;
					containHeight = relParentHeight;

				}

				function findLeft() {

					left = linkPosLeft - subMenuHalf + linkHalf;

					if ((left + subMenuWidth) > containWidth || (left < 0)) {

						// Left overflow
						if (left < 0) {

							if(link.hasClass('pop-right')) {
								link.removeClass('pop-right');
							}

							return 0;

						} else {

							// Must have been right overflow, additional padding for the right side.
							link.addClass('pop-right');

							return containWidth - subMenuWidth - defaults.iSidePadding;
						}

					}

				}

				function findTop() {

					// If we are going to be 
					if (defaults.bEnsurePlacement) {

						// Get the element relative to the page!
						var pageElmTop = link.offset().top,
						bottomPopover = pageElmTop + link.outerHeight() + subMenuHeight;

						// Get viewport bottom position
						var containBottom = windowHeight + $(window).scrollTop();

						// Determine if the bottom of the popover is lowever than the window height.
						if (bottomPopover > containBottom) {

							// Pop-up!
							link.addClass('pop-up');
							return linkPosTop - subMenuHeight - defaults.iTopPadding;

						} else {

							// Remove the pop-up class if we need it!
							if (link.hasClass('pop-up')) {
								link.removeClass('pop-up');
							} 

						}

						return linkPosTop + link.outerHeight();

					} else {

						// Dont worry where the item will land always pop below element.
						return linkPosTop + link.outerHeight();

					} 

				}

				// Set the element style.
				submenu.css({top:findTop(), left: findLeft()});

			}
		};

		defaults = $.extend(defaults,options);


		// Loop through all passed elements in the selector array.
		return this.each(function(i) {

			// Store off important objects
			var link = $(this),
			submenu = link.next('div:first'),
			parentContainer = link.parents('ux.content');

			// Get the sub menu container and put a class on it.
			submenu.addClass('ux-submenu');

			link.on('click', function(e) {

				// Disable defualt link action
				e.preventDefault();

				if (!submenu.is(':visible')) {

					link.addClass('selected');

					// Check if we need to determine positon. Using top as our check
					// style but left could have been used instead
					if (link.css('top') == 'auto') {

						// Call the moduler placement functions. This was made overwriteable purposely.
						defaults.placementFunction(link, submenu, defaults);

					}

					// Show popover
					submenu.show();

				} else {

					// Hide the popover
					link.removeClass('selected');
					submenu.hide();

				}

			})

		});

	}

})( jQuery );