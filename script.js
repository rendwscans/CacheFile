$_jq(document).ready(function() {
     var wallpaperTitle = '';
     
	if(global.isSasEnabled) {	
	
	$_jq('#bgcdw_login_form_username').attr('placeholder', $_jq('.bgcdw_login_form_username label').text());
	$_jq('#bgcdw_login_form_password').attr('placeholder', $_jq('.bgcdw_login_form_password label').text());
	//$_jq('#bgcdw_login_form_username, #bgcdw_login_form_password').placeholder();

	$_jq('#bigActionButtonContainer').click(function() {
		$_jq('.bgc_signup_form_register', '.bgc_signup_form_buttons').trigger('click');
	}); // signup hook
	
	 //$_jq(".bgcdw_remindpassword").fancybox({'type': 'ajax'}); // passwordForgotLink

	 $_jq('.bgc_signup_container').addClass('overflow-y');

	 var isSignupFormEntered = false;
	 var isSignupFormToggled = false;
	 var isSignupFormError = false;
	 var signupFormTimer = null;
	 
     
     // HACKYYYYYYYY
     $_jq("#bgcdw_doubleOptInInfo_container").addClass("bgc");
     $_jq("#bgcdw_doubleOptInInfo_container").addClass("bgcdw_errors_all");
     
     $_jq("#bgcdw_doubleOptInInfo_container").css("text-align","center");
     $_jq("#bgcdw_doubleOptInInfo_container div").css("text-align","left");
     
     $_jq("#bgcdw_doubleOptInInfo_container a").css("color","#FF0000");
     
     $_jq("#bgcdw_doubleOptInFirstLogin_container").addClass("bgc");
     $_jq("#bgcdw_doubleOptInFirstLogin_container").addClass("bgcdw_errors_all");
     
     $_jq("#bgcdw_doubleOptInFirstLogin_container").css("text-align","center");
     $_jq("#bgcdw_doubleOptInFirstLogin_container div").css("text-align","left");
     
     $_jq("#bgcdw_doubleOptInInfo_container a").css("color","#FF0000");
     // HACKY END
     
	 $_jq('#global-signup').click(function(e) {
		
		 if( (isSignupFormEntered || isSignupFormError) && !isSignupFormToggled) {
			 
			 if(signupFormTimer === null) {
				 $_jq(".bgc_signup_container", this).toggleClass("newClass overflow-y", 250);
				 
				 // simulate toogle class timeout
				 signupFormTimer = setTimeout(function() {
					 isSignupFormToggled = true;
					 handleArrow();
				 }, 250);
			 }
		 }	 
	 }).mouseenter(function(e) {
		isSignupFormEntered = true; 
	 }).mouseleave(function(e) {
		isSignupFormEntered = false; 
	 });
	 
	 // auto toggle signup form if errors thrown on page refresh
	 if($_jq('.bgcdw_errors', '#global-signup').length > 0) {
		 isSignupFormError = true;
		 $_jq('#global-signup').trigger('click');
	 }

	 function showArrow() {
		$_jq('.arrow', '#global-signup').show();
	 }
	 
	 function hideArrow() {
		 $_jq('.arrow', '#global-signup').hide();
	 }

	 function handleArrow() {
		 
		 if(document.getElementById('bgc_signup_container') && document.getElementById('bgc_signup_container').scrollHeight > document.getElementById('bgc_signup_container').clientHeight) {
			 showArrow();
		 } else {
			 hideArrow();
		 }
		 
		 return;
	 }
	 
	 handleArrow(); // handle arrow
	 
	 $_jq('body').click(function() {
		 
		 if(!isSignupFormEntered && isSignupFormToggled) {
			 
			 $_jq(".bgc_signup_container", this).toggleClass("newClass overflow-y", 250);
			 
			 if(signupFormTimer != null) {
				 clearTimeout(signupFormTimer);
				 signupFormTimer = null;
			 }
			 isSignupFormToggled = false;
			 
			 setTimeout(handleArrow, 250); // async
		 } 
	 });
	 
	 $_jq('select', '#global-signup').mouseleave(function(e) {
		 e.stopPropagation(); // very important, cause mouseleave event is fired on select
	 });
	 
	 $_jq('.bgcdw_errors', '#global-signup').live('mouseenter', function() {
		 if(!isSignupFormToggled) {
			 isSignupFormError = true;
			 $_jq('#global-signup').trigger('click');
		 }
	 });
	 
     
	 /*
	 var loginFlashError = $_jq('.bgcdw_login_container .bgcdw_errors_flash');
     
     if (loginFlashError.length > 0) {
         loginFlashError.hide();
         $_jq('.bgcdw_errors_all_wrapper').show();
     };
     */
	}
	
    
    $_jq('.scroll-pane').bind(
        'jsp-initialised',
        function(event, isScrollable)
        {
            var jscrollpaneBackground = '<div class="scrollbarBgTop"></div><div class="scrollbarBgMain"></div><div class="scrollbarBgBottom"></div>';
            $_jq('.scroll-pane .jspVerticalBar').prepend(jscrollpaneBackground);
        }
    ).jScrollPane({
        showArrows:true,
        verticalDragMinHeight: 68,
		verticalDragMaxHeight: 68,
		verticalDragMinWidth: 68,
		verticalDragMaxWidth: 68
    });
    
    
	// tracking events
	$_jq("input#loginForm_default_loginButton").click(function() {tracking.push(tracking.events.login); });
	$_jq("a.loginForm_default_link_forgot").click(function() {tracking.push(tracking.events.passwordForgot); });
	$_jq("#actionStartButtonContainer").click(function() {tracking.push(tracking.events.startClient); });
	
	// hacks & events
	
	if(!global.isSasEnabled) {
		$_jq('#bigActionButtonContainer').click(function() {$_jq('#signup_submit').trigger('click');}); // signup hook
	}
	
    $_jq("#user-edit").fancybox({'type': 'ajax'}); // userEditLink 
    
    // var supportLink = $_jq("#gl_footer_element_link_support").attr("href");
    //
    // if (undefined !== supportLink && "mailto" !== supportLink.split(":")[0]) {
    //     $_jq("#gl_footer_element_link_support").fancybox({'type': 'ajax'}); // supportFooterLink
    // }
    
    //$_jq("#loginForm_default_link_forgot").fancybox({'type': 'ajax'}); // passwordForgotLink
    
    $_jq(".teaser-button").fancybox({'type': 'ajax'}); // teaserButton
    $_jq("#raffle-btn").fancybox({'type': 'ajax'}); // raffle btn
    
    // compApp
    $_jq("#compApp").fancybox({'type': 'ajax'});
    $_jq("#compApp2").fancybox({'type': 'ajax'});

	$_jq('#gl_facebook_like').appendTo('.share-facebook'); // remap facebook like
	$_jq('#logo').click(function () { window.location.href='/'; }); // logoLink
	if($_jq('#attentionLayer').css('visibility') != 'hidden') { $_jq('#attentionLayer').css('display', 'block'); }  // signup attention Hack

	// cookie check
	if(typeof(checkMyCookies) == 'function') {
		var cookieMsg = checkMyCookies();
		if(cookieMsg.length > 0) {
			$_jq('#noCookie').show();
			$_jq('#noCookie').html(cookieMsg);
		}
	}
	
	// Multiple Instance Layer Handling
	if($_jq('#layer').length > 0) {
		$_jq("#showLayer").fancybox({'type' : 'inline', 'scrolling' : 'no',
			'onClosed' : function() {
				if($_jq('#loginerr').length == 0) {
					$_jq('#layer').html('');
					window.location.href='/';
					return;
				} else {
					tracking.push(tracking.events.loginErrClose);
				}
				$_jq('#layer').html('');
			}});
		$_jq("#showLayer").trigger('click');
	}
	
	// message layer handling
	if($_jq('#message').length > 0) {
		$_jq("#message").fancybox({
			'type' : 'inline'
		});
	}

	// video gallery
	$_jq("a[rel='group-videos1']").fancybox();
	
	$_jq("a[rel='group-videos']").fancybox({
	    'transitionIn' 	: 'fade',
	    'transitionOut' : 'fade',
	    'autoscale'  	: 'true',
	    'type' 			: 'swf',
	    'swf'			: {
			'wmode'				: 'transparent',
			'allowfullscreen'	: 'true'
		}
	});

	function formatTitle(title, currentArray, currentIndex, currentOpts) {
         
        var elmId = currentArray[currentIndex].id;
        var imageId = elmId.split('-')[1];
         
        $_jq.ajax({
            url: 'index.php?controller=resources&action=wallpaperView',
            type: 'POST',
            data: {id: imageId },
            dataType: 'html',
            async: false,
            success: function(data) {
                wallpaperTitle = data;
            }
        });
        return(wallpaperTitle);
		/*
		var href = $_jq(this).attr('href');
		var host = '/images/global/';
		var imageName = href.split('wallpapers/')[1].split('_')[0];
		
		if(imageName.length > 0) {
			var links = '<span style="display:inline-block;">' + title + ':</span> ' +
			' <a href="' + host + 'wallpapers/' + imageName + '_800x600.jpg" target="_blank" style="display:inline-block;">800x600</a> | ' +
			' <a href="' + host + 'wallpapers/' + imageName + '_1024x768.jpg" target="_blank" style="display:inline-block;">1024x768</a> | ' +
			' <a href="' + host + 'wallpapers/' + imageName + '_1280x960.jpg" target="_blank" style="display:inline-block;">1280x960</a> | ' +
			' <a href="' + host + 'wallpapers/' + imageName + '_1680x945.jpg" target="_blank" style="display:inline-block;">1680x945</a> | ' +
			' <a href="' + host + 'wallpapers/' + imageName + '_1920x1080.jpg" target="_blank" style="display:inline-block;">1920x1080</a>';
		} else {
			var links = "";
		}
        */

	    //return '<table cellspacing="0" cellpadding="0" id="fancybox-title-float-wrap"><tbody><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + (title && title.length ?  links : '' ) + '</td><td id="fancybox-title-float-right"></td></tr></tbody></table>';
	}
	
	$_jq("a[rel='wallpaper']").fancybox( { titleFormat: formatTitle }); /* screenshot gallery */

	/* LoginContainer - focus loginInput & replace labels */
	if(!global.isSasEnabled && $_jq('#loginForm_default_container').length != 0) {
		
        var usernameCaption = $_jq('#loginForm_default_label_username').html();
        var passwordCaption = $_jq('#loginForm_default_label_password').html();
        var usernameInput = $_jq('#loginForm_default_input_username');
        var passwordInput = $_jq('#loginForm_default_input_password');
        
        var SignupCaption = $_jq('#loginForm_default_signupButton').val();
        $_jq('.signup-form').html(SignupCaption);
        
        var passwordForgotCaption = $_jq('#loginForm_default_link_forgot').html();
        $_jq('.passwordForgot-form').html(passwordForgotCaption);
        
        if(usernameInput.val() == "") {
        	usernameInput.val(usernameCaption);
        }
        
        if(passwordInput.val() == "") {
        	passwordInput.val(passwordCaption);
        }

        usernameInput.focus(function() {
            var usernameCaption = $_jq('#loginForm_default_label_username').html();
            if($_jq(this).val() == usernameCaption) {
                $_jq(this).val('');
            }
        });
 
        usernameInput.blur(function() {
            var usernameCaption = $_jq('#loginForm_default_label_username').html();
            if($_jq(this).val() == "") {
                $_jq(this).val(usernameCaption);
            }
        });

        passwordInput.focus(function() {
            var passwordInput = $_jq('#loginForm_default_label_password').html();
            if($_jq(this).val() == passwordInput) {
                $_jq(this).val('');
            }
        });

        passwordInput.blur(function() {
            var passwordInput = $_jq('#loginForm_default_label_password').html();
            if($_jq(this).val() == "") {
                $_jq(this).val(passwordInput);
            }
        });
    }
	
	$_jq('#languages').click(function() {
		$_jq('ul', this).animate({height: 'toggle'}, 100);
	});
	
	$_jq('#instancesDropdown').click(function() {

		var that = this;
		var list = $_jq('ul', this);
				
		if($_jq('li', list).length > 0) {
			if(list.is(':hidden')) {
				
				if(global.timestamp != null && global.timestamp <= (Math.round(new Date().getTime() / 1000) - 180) ) {

					list.html('');

					var current = $_jq('.title', that);
					var title = current.text();
					current.html('');
					current.addClass('spinner');
				
					$_jq.ajax({
						type : "GET",
						dataType: "json",
						url  : "index.php",
						data: ({controller : 'user', action : 'instances'}),
						async: false,
						success: function(json){
							
							current.removeClass('spinner');
							current.append(title);
							
							if(typeof(json) == undefined || "" == json)  {
								return;
							}

							for(var i in json) {
								var instance = json[i];
								if(typeof(json) != 'object') return;
								var a = $_jq('<a></a>').attr('href', instance.url).html(instance.instanceName);
								var li = $_jq('<li></li>').append(a);
								if(instance.keyID == 0) {
									li.addClass('notSaved');
								}
								list.append(li);
							}
							global.timestamp = Math.round(new Date().getTime() / 1000);
			       	   }
					});
					
					
				}
			}
		}
		
		list.animate({height: 'toggle'}, 100);
	});
		
	$_jq("a[rel='screenshot-group']").fancybox({'cyclic' : true});
	$_jq('#slideshow .inner').innerfade({ animationtype: 'fade', speed: 750, timeout: 5000, type: 'random', containerheight: '140px' });
});