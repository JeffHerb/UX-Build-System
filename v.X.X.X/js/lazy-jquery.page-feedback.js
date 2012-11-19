	/*
	 * Resets the page rating back to its inital stat.
	 */

	function changeRating(changeLink, hiddenLinkWidth) {

		// Deleted the cookie holding the temp rating
		$.cookies.del(generatePageName());

		// Get important values
		var cl = $(changeLink),
		activeVote = cl.siblings('.vote'),
		hiddenVote = cl.siblings('a').not('.vote'),
		written = $('#written-feedback');

		// Hide the change link from the user
		cl.fadeOut('slow').delay(250).remove();

		// Remove all vote classes
		activeVote.removeClass('vote');

		// Undo the vote action by setting the value to 0
		postRating("0", "change");

		// Display hidden vote item
		hiddenVote.on('click',ratingClick).animate({opacity: 1, width: hiddenLinkWidth }, {duration: 650, queue: false});

		// Hide the comment section if it is displayed.
		if (written.is(':visible')) {
			written.slideUp('slow');
		}

	}

	/*
	 * Function will executed on click of a change rating link
	 */

	function addChangeRating(rating, hiddenLinkWidth, moreInfo){

		// link to allow user to change their rating
		var changeLink = $('<a id="change-link" href="#">Change</a>').on('click', function(e) {
			
			// Prevent default action
			e.preventDefault();

			// Setup change link.
			changeRating(this, hiddenLinkWidth);
		});

		changeLink.delay(500).insertAfter(rating).fadeIn('fast', function() {
			
			// Toggle to show comment area or not based on rating.
			if (moreInfo) {
				$('#written-feedback').slideDown();
			}

		});

	}

	/*
	 * Mark the choosen rating and expose the change option and the additional info form if need be.
	 */

	function markRating(rating) {

		// Save off the the rating type
		var negVote = rating.hasClass('downvote'),
		moreInfo = false,
		updown = "1";
		actionType = $('#ratings').attr('data-type');

		// Check to see if the needs improvement was check to flag if the additional info
		// function needs to be called
		if (negVote) {
			moreInfo = true;
			updown = "-1";
		}

		rating.addClass('vote');
		otherRatingWidth = rating.siblings('a').width();
		rating.siblings('a').off('click').animate({opacity: 0, width: 0 }, {duration: 650, queue: false, complete: addChangeRating(rating, otherRatingWidth, moreInfo)})

		// Set the rating cookie.

		// Post the rating made.
		postRating(updown, actionType);


		// Chekc to see if negitive vote was false. If so then we want to show the thank you message
		if (!negVote) {
			showThanks();
		}

	}

	/*
	 * Function to display the Thank You feedback
	 */

	 function showThanks(){
	 	$('#pr-thank-you span').fadeIn('slow').delay(2500).fadeOut('slow');
	 }

	/*
	 * Page rating fucnctions
	 */

	function ratingClick(e) {
		e.preventDefault();

		ratingLink = $(this);

		if ( !ratingLink.hasClass('vote') ) {
			markRating(ratingLink);
		}

	}

	/*
	 * Simple function to hide the input character section.
	 */ 

	function hideCommentShowThanks(e) {

		// Hide just the form and display the thank you message
		$("#written-feedback").slideUp('slow', showThanks);
	}

	/*
	 *	Written feeback functions
	 */

	function writtenSubmit(e) {

		// Prefent click from doing any action.
		e.preventDefault();

		// Check to see if there is even text in the box
		if ($("#written-feedback textarea").val() != "") {
			
			// Send the comment to the database via ajax.
			postComment($("#written-feedback textarea").val());

			// Hide just the form
			hideCommentShowThanks();
		}
	}

	/*
	 * Ajax POST rating made by the user.
	 */

	function postRating(updown, actionType) {

		// Variable to store optional data
		var postedData = "",
		optionalData = "",
		pageVersion = "0",
		pageLastUpdate = "",
		processingPage = "/app/page-feedback/page-feedback.php";

		//"/secure/forms/page-feedback.php",

		// Check for a page revision number
		if ($('meta[name="revisionNumber"]').length) {
			pageVersion = $('meta[name="revisionNumber"]').attr('content');
			optionalData += ("&pageVersion=" + pageVersion);
		}

		// Check for a page last updated value
		if ($('meta[name="lastUpdated"]').length) {
			pageLastUpdate = $('meta[name="lastUpdated"]').attr('content');
			optionalData += "&pageLastUpdate=" + pageLastUpdate;
		}

		postedData = "type=" + actionType + "&rating=" + updown + "&pageURL=" + window.location + optionalData;

		if (actionType == "insert") {


			// Post data to process page.
			$.ajax({
				type: "POST",
				url: processingPage,
				data: postedData
				}).done(function(data) { 
					//data = JSON.parse(data);
					//console.log(data);
					$('#ratings').attr('data-key',data.substring(0,10));

					// Creat the cookie
					createRatingCookie(updown, data.substring(0,10), pageVersion, pageLastUpdate);
				}).fail(function(jqXHR, textStatus) {
				  	//console.log( "Request failed: " + textStatus );
				  	//console.log(jqXHR);
				});

			// Change the action method at this point to change.
			$('#ratings').attr('data-type','change');

		} else {

			// Get the userKey that was generated by the original insert.
			var userKey = $('#ratings').attr('data-key');

			// Send the new post data
			$.ajax({
				type: "POST",
				url: processingPage,
				data: "type=" + actionType + "&rating=" + updown + "&pageURL=" + window.location + "&userKey=" + userKey
				}).done(function(){

					// Check to make sure the change is not to a neutral setting.
					if (updown != "0") {
						// Create a new cookie as none should exist right now.
						createRatingCookie(updown, userKey, pageVersion, pageLastUpdate);
					}

				}).fail(function(jqXHR, textStatus) {
				  //console.log( "Request failed: " + textStatus );
				  //console.log(jqXHR);
				});

		}

	}

	/*
	 * Ajax POST comments made by the user.
	 */

	function postComment(comment) {

		// Get the userKey that was generated by the original insert.
		var userKey = $('#ratings').attr('data-key'),
		processingPage = "/app/page-feedback/page-feedback.php";

		// Send data to the processing page.
		$.ajax({
			type: "POST",
			url: processingPage,
			data: "type=comment&pageComment=" + comment + "&userKey=" + userKey
		});

	}

	/*
	 *  Genereate a usable page title for cookies
	 */

	function generatePageName() {
		
		// Get the page name from the url.
		var sPath = window.location.pathname,
		sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

		// Check to determine if page is an index page and if so get the url from the previous level.
		if (sPage == "") {
			sPage = sPath.split('/');
			sPage = sPage[sPage.length - 2] + '-index';
		}

		// Return the page name
		return sPage;
	}

	/*
	 * Function creates cookies for page rating
	 */
	function createRatingCookie(updown, userKey, pageVersion, pageLastUpdate) {

		// Get the current time and add 30 minutes. This is the time the user has to go back and change there rating.
		var d = new Date(),
		time = d.getTime() + ((1000 * 60) * 30).toString();

		var pageCookie = {
			"rating": updown,
			"userKey": userKey,
			"pageVersion": pageVersion,
			"pageLastUpdate": pageLastUpdate,
			"expireTime": time
		};

		var cookieSettings = {
			expiresAt: d.setDate(d.getDate()+30)
		};

		// Create the cookie
		$.cookies.set(generatePageName(), pageCookie, cookieSettings);

	}

	/*
	 * Standard function to setup page load to reflect existing rating
	 */
	function existingRating(vote, cookieVal) {

		var d = new Date();

		// Get the current tyime
		time = d.getTime();

		// Check to see if the vote was positive or neagitve.
		if (vote) {
			ratingLink = $('.upvote');
		} else {
			ratingLink = $('.downvote');
		}


		// Check to see the age of the variable
		if ( ($('meta[name="revisionNumber"]').attr('content') == cookieVal.pageVersion) || (!($('meta[name="revisionNumber"]').length) && cookieVal.pageVersion == "0")) {

			// Check to see if the vote should be locked based on the time
			if (time < parseInt(cookieVal.expireTime)) {

				// User could still change there mind only show the voted item
				ratingLink.addClass('vote');

				// Bind events handlers and show page.
				initializePageRating(false);

				// Change insert to change and bind userKey
				$('#ratings').attr('data-type','change').attr('data-key', cookieVal.userKey);

				// Call the basic functionality needed from markrating to ensure consistant functionality.
				otherRatingWidth = ratingLink.siblings('a').width();
				ratingLink.siblings('a').off('click').animate({opacity: 0, width: 0 }, {duration: 0, queue: false, complete: addChangeRating(ratingLink, otherRatingWidth, false)});

				// Show now that we have corrected form functionality.
				showPageRating();


			} else {

				// They cant make changes at this point. Lock them out, disable the click events by prevent default and hide clickability.
				ratingLink.addClass('vote locked').on('click',function(e){e.preventDefault();}).siblings('a').hide();
				
				// Show the none interactive version because its locked out.
				showPageRating();

			}


		} else {

			// Since the revision numbers have changed we need to delete the cookie and do a regular load
			$.cookies.del(generatePageName());
			initializePageRating(true);

		}

	}

	/*
	 * Standard statup function
	 */
	function initializePageRating(show) {

		var upvote = $('#ux-page-rating .upvote'),
		downvote = $('#ux-page-rating .downvote'),
		feedback = $('#feedBackSubmit'),
		noComment = $('.no-comment');

		// Setup click events.
		upvote.on('click', ratingClick);
		downvote.on('click', ratingClick);
		feedback.on('click', writtenSubmit);
		noComment.on('click', hideCommentShowThanks);

		if (show) {
			// Show the page rating compent now that they are all setup.
			showPageRating();
		}

	}

	/*
	 * Fade in the page rating component
	 */
	function showPageRating() {

		// Simply fadeInRating
		$('#ux-page-rating').animate({opacity: 1}, {duration: 2000, queue: false });

	}

$(document).ready(function(){

	if (location.protocol == "https:") {

		$('#ux-page-rating').hide();	

	} else {


		// Check to see if the page feedback component even exists.
		if ($('#ux-page-rating')) {

			// Predefined 
			var cookieVal = $.cookies.get(generatePageName()), rating = true;

			// Check to see if there is a rating cookie
			if (cookieVal) {

				if (cookieVal.rating) {

					if (cookieVal.rating == "-1") {
						rating = false;
					}

					existingRating(rating, cookieVal);

				} else {
					initializePageRating(true);
				}

			} else {

				// Call the statup function.
				initializePageRating(true);

			}
		}

	}

});




