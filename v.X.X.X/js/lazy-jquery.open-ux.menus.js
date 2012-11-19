(function($){
	
	// Create the plugin
	$.fn.domainMenu = function(options) {

		function menuOffset(menuLi) {

			// Get some important numbers. Such as container and menu item
			// left offset as well as content window sizes for determining
			// placement of items drop downs.
			var menuLeft = (($('#ux-domain-menu nav').offset().left) - menuLi.offset().left) * -1,
			contentSize = $('#ux-domain-menu nav').width(),
			menuLists = 0;

			// Get the width of all the unorder list found in the container
			menuLi.children('div:first').children('ul').each(function(i){
				
				// Loop through and add up all of the list sizes.
				menuLists += $(this).width();

			});

			// If the list size is greater than the remaining space return true.
			if ((contentSize-menuLeft) < menuLists) {
				return true;
			} else {
				return false;
			}

		}

		// Loop through all passed elements in the selector array.
		return this.each(function(i) {


			// Save off the current object
			var menu = $(this);

			// Check to make sure the item has a sub container before continuing
			if (menu.next('div:first').length) {

				var menuSub = menu.next('div:first'),
				menuLi = menu.parent('li');

				// Add the submenu class
				menu.addClass('ux-domain-submenu');

				// Offset check
				if (menuOffset(menuLi)) {
					menuSub.addClass('right-menu');
				}

				// Bind the click event the menu items
				menu.on("click", function(e) {

					// Prevent default action.
					e.preventDefault();

					// Remove the class from any other selected item if it exists.
					menuLi.siblings('.selected').removeClass('selected');

					// Toggle the selected menu show/hide.
					if (!menuLi.hasClass('selected')) {

						// Add class to show menu.
						menuLi.addClass('selected');

						// Disable any possible click throught
						e.stopPropagation();

						// Unbind any possible html click 
						$('html').on("click", function() {

							// Find a remove any open item
							$('.ux-domain-submenu').parent('.selected').removeClass('selected');

							// Unbind this html click now that the item has been removed.
							$(this).off('click');
						});	


					} else {
						
						// Remove the selected class to hide the menu.
						menuLi.removeClass('selected');

						// Remove the html click event that is ignored because use click link again
						$('html').off('click');
					}

				});

			}
			
		});

	}

})( jQuery );