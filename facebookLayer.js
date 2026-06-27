;(function(window, document, $) {
	

var facebookLayer = new FacebookLayer();
$('document').ready(function() {
    facebookLayer.init();
});
function FacebookLayer()
{
    this.init = function()
    {
    	/* HACK PIRATES-3698 */
    	if($_jq('ul.bgcdw_errors_usernameSuggestions').first().children('li').length > 0) {
    		$('.bgcdw_errors_usernameSuggestions').show();
    	} else {
    		if ($('#bgc_fbSignup_form_username').first().val() == '') {
        	    $('.bgc_fbconnect_signup .bgcdw_errors_usernameSuggestions').hide();
        	}; 
    	}
    	/* HACK END */
    	
        $('#facebookConnectClose').click($.proxy(function() {
            this.close();
        }, this));

        $('#facebookOverlay').click($.proxy(function() {
            this.close();
        }, this));

        
        //maaagic
        var passwordString = $('<div></div>').addClass('passwordString');
        $('.bgc_fbConnect_form_password').append(passwordString);
        
        //move input captions into input fields
        var usernameConnectCaption = $('.bgc_fbConnect_form_username label').html();
        var passwordConnectCaption = $('.bgc_fbConnect_form_password label').html();

        var usernameSignupCaption = $('.bgc_fbSignup_form_username label').html();

        var usernameConnectInput = $('#bgc_fbConnect_form_username');
        var passwordConnectInput = $('#bgc_fbConnect_form_password');

        var usernameSignupInput = $('#bgc_fbSignup_form_username');

        passwordString.html(passwordConnectCaption);


        //initial setting of the captions
        if(usernameConnectInput.val() == "") {
            usernameConnectInput.val(usernameConnectCaption);
        }

        if(passwordConnectInput.val() == "") {
            //passwordConnectInput.val(passwordConnectCaption);
            passwordConnectInput.addClass('empty');
        }

        if(usernameSignupInput.val() == "") {
            usernameSignupInput.val(usernameConnectCaption);
        }

        //events to set/unset captions
        usernameConnectInput.focus(function() {
            if($(this).val() == usernameConnectCaption) {
                $(this).val('');
            }
        });

        usernameConnectInput.blur(function() {
            if($(this).val() == "") {
                $(this).val(usernameConnectCaption);
            }
        });

        usernameSignupInput.focus(function() {
            if($(this).val() == usernameSignupCaption) {
                $(this).val('');
            }
        });

        usernameSignupInput.blur(function() {
            if($(this).val() == "") {
                $(this).val(usernameSignupCaption);
            }
        });

        passwordConnectInput.focus(function() {
            if($(this).val() == '') {
                $(this).removeClass('empty').addClass('filled');
                //$(this).val('');

            }
        });

        passwordConnectInput.blur(function() {
            if($(this).val() == "") {
                //$(this).val(passwordConnectCaption);
                $(this).removeClass('filled').addClass('empty');
            }
        });
        

    };

    this.close = function()
    {
        $('#facebookOverlay').fadeOut();
        $('.facebookConnectLayer').fadeOut();
    };
}

}(this, document, jQuery));