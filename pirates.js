/* GLOBAL AJAX COMPLETE FOR MAINTENANCE PAGE ACTION */

$_jq(document).ajaxComplete(function (event, xhr, settings) {
	event.preventDefault();	
	if (typeof(xhr) == 'object' && typeof(xhr.responseXML) == 'object' && xhr.responseXML) {
		var status = $_jq(xhr.responseXML).find('Status').text();
		var url = $_jq(xhr.responseXML).find('Redirect').text();
		if (status == 'TRUE') {
			window.location.href = url;
			return false;
		}
	}
});

var Mena = {	
	setDirection : function(dir) {
		
		if(dir != 'rtl' && dir != 'ltr') {
			console.warn(dir + ' is an invalid direction.');
			return;
		}

		var root = $_jq('html');
		var body = $_jq('body');

		if(dir == 'rtl' && !body.hasClass('rtl')) {
			body.addClass('rtl');
			root.attr('dir', dir);
		} else if(dir == 'ltr' && root.attr('dir') != 'ltr') {
			body.removeClass('rtl').addClass('ltr');
			root.attr('dir', dir);
		} else {
			console.info(dir + ' is allready set.');
		}
	}
};

function debugProxy (message) {
	if (typeof debugMessage === "function") {
		debugMessage(message);
	}
	console.log(message)

}


function pirateName(action) {
    $_jq.fancybox({
        type:'ajax',
        href: 'index.php?controller=user&action=edit',
        ajax:{data:{part: action},type: 'POST'}
    }); 
}

function openTrailer() {
	
	if($_jq('#trailer-big').attr('href') != "") {
		$_jq.fancybox({
			type: 'iframe',
			href: $_jq('#trailer-big').attr('href'),
			width: 800,
			height: 450
		});
	}		
}

var raffle = {
	button: function(type) {
		switch(type) {
		  case "signup": 
			  $_jq("#raffle-signup-button").fancybox({ 'type': 'ajax'}); break;
		  case "mail": $_jq("#raffle-mail-button").fancybox({'type': 'ajax'}); break;
		  case "okay": $_jq("#raffle-okay-button").click(function(e) { e.preventDefault(); $_jq.fancybox.close(); }); break;
		  case "age.verification": 
			  
			  var container = $_jq('#raffleContainer');
			  var button = $_jq('#raffle-signup-button', container);
			  var form = $_jq('#ageVerfication', container);
			  var name = $_jq('input[name="name"]', form);
			  var terms = $_jq('input[name="terms"]', form);
			  var orginHref = button.attr('href');
			  var isActive = false;
			  
			  button.attr("href", "javascript:void(0);");
			  
			  function activate() {
				  if(isActive) return;
				  button.removeClass('inactive');
				  button.attr('href', orginHref);
				  button.click(function(e) { e.preventDefault(); raffle.verificate(orginHref); })
				  isActive = true;
			  }
			  
			  function deactivate() {
				  if(!isActive) return;
				  button.unbind('click');
				  button.attr("href", "javascript:void(0);");
				  button.addClass('inactive');
				  isActive = false;
			  }
			  
			  // minified
			  function isTermsChecked() { return terms.attr('checked') ? true : false; } // validate checkbox
			  function isValidName() { return $_jq.trim(name.val()).length > 0 ? true : false; } // validate name length
			  form.change(function() { isTermsChecked() && isValidName() ? activate() : deactivate(); }); // form change
			  name.keyup(function() { isTermsChecked() && isValidName() ? activate() : deactivate(); }); // name change

			  break;
		  default: break;
		}
	},
	
	verificate: function(href) {
		
		var container = $_jq('#raffleContainer');
		var form = $_jq('#ageVerfication', container);
		
		$_jq.fancybox.showActivity();
		
		$_jq.ajax({
			url: href,
		    type: 'POST',
		    data: form.serializeArray(),
		    dataType: 'html',
		    success: function(data) {
		    	$_jq.fancybox(data);
		    }
		});
	}
};

var ekomi = {
	button: function () {
		$_jq("#ekomiSurveyOkButton").fancybox({ 'type': 'ajax'});
	}
};

var clientHandler = {
		
		// posibilities: webkit, mozilla, opera, msie
	    aWhiteList   : new Array('webkit', 'mozilla', 'opera', 'msie'), 
	    sLayer    	 : '#FlashLayer',
	    bShowClient  : false,
	    
	    init: function() {
			debugProxy("init clientHandler");
	    	this.bShowClient = this.isCompatible();
	    },

	    handleVisibilty: function() {
			debugProxy("handle clientVisibility");
	        if(!this.bShowClient) {
	        	
	            var oClient = $_jq(this.sLayer);
	            
	            if(oClient.css('visibility') != 'hidden') {
	                oClient.css('visibility', 'hidden');
	            } else {
	                oClient.css('visibility', 'visible');
	            }
	        }
	    },

	    isCompatible: function() {
	    	
	    	var bCompatible = false;
	    	
	        // jQuery Browser Detection: get webkit browser (chrome or safari)
	        $_jq.browser.safari = ( $_jq.browser.webkit && !/chrome/.test(navigator.userAgent.toLowerCase()) ) ? true : false;
	        
	        $_jq.each(this.aWhiteList, function(key, value) { 
	        	// check browser is compatible with overlay on objects
	        	if(!$_jq.browser.safari && $_jq.browser[value]) {
	        		bCompatible = true;
	        	}
	        });
			debugProxy("check is compatible: " + bCompatible);
	        return (bCompatible) ? true : false;
	    }
};

/*var slayer = {
		debug: false,
		slayer: undefined,
		isClientCompatible: false,
		
		init: function() {
            
			var initParams = {
                // BASIC SETTINGS
				gameId			: global.gameId,
				gameTitle		: global.gameTitle,
                dispatcherUrl	: global.dispatcherUrl,
				
                instanceId		: global.instanceId,
                affiliateId		: global.affiliateId,
                userId			: global.userId,
                userKeyId		: global.userKeyId,
                
                language        : global.locale,
                country         : global.country,
                
                // FACEBOOK SETTIMGS
				facebook      	: { 
                    language : global.locale 
                },
                
                // GOOGLE SETTINGS
                google			: { 
                    language : global.locale 
                },
					
				invite			: {
                    currentUsername	: global.currentUserName,
                    inviteUrl		: global.shareURL
                },
				
				events			: {}
			};
			
			this.isClientCompatible = clientHandler.isCompatible();
			
			// recheck ie
			if($_jq.browser.msie && document.querySelector && !document.addEventListener) {
				this.isClientCompatible = false;
			}
			
			SLAYER.init(initParams);
			
			if(global.dev && this.debug) {
				SLAYER.printLog();
			}
			
			$_jq('.close', '#slayer-root').live('click', (function() {
				if($_jq('#friendInviteFrame').length > 0) {
					$_jq('#friendInviteFrame').hide();
				}
			}));
			this.slayer = SLAYER;
		},
		
		invite: function() {
			
			if('undefined' == typeof(SLAYER)) {
				slayer.init();
			}
			
			SLAYER.renderInviteDialog(); // prerender

			if(this.isClientCompatible) {

				var root = $_jq('#slayer-root');
				var stage = $_jq('#friendInviteFrame');

				// stage exists?
				if(stage.length == 0) {	
					var frame = $_jq('<iframe id="friendInviteFrame" src="" scrolling="no" frameborder="0" margin-height="0" margin-width="0" width="582" height="462" style="border:none; z-index:9998;"></iframe>'); // FLASH HACK
					root.append(frame); // create stage
				} else {
					stage.show(); // show stage
				}
				// set water-color background
				$_jq('#slayer_dialogBg', root).addClass('water');
			}
		},
				
		googlePlus: function() {

			if('undefined' == typeof(SLAYER)) {
				slayer.init();
			}
			
			var plusoneParameter = {
					align			   : (global.direction == 'rtl') ? 'left' : 'right',
					container          : 'googlePlusOne', // Div tag where the button should be rendered
					annotation         : 'bubble', // Rendering of the count. Options: none, bubble*, inline**
					href               : global.shareURL, // The link you want to plus one
					size               : 'medium', // Size of the button. Can be: small, medium, standard, tall
					expandto           : 'bottom' // The preferred positions in which to display hover and confirmation bubbles, relative to the button.
				};
					
			SLAYER.renderPlusOne(plusoneParameter);
		},
		
		facebookLike: function() {

			if('undefined' == typeof(SLAYER)) {
				slayer.init();
			}
			
			var likeParameter = {
					container         : 'facebookLike', // Div container where the button will be rendered
					href              : global.shareURL, // Default is current URL
					send              : false, // Show the send button. Default false
					layout            : 'button_count', // You can use 'standard', 'button_count' or 'box_count'
					show_faces        : true, // Show profile pictures of people who liked. Only works with standard layout.
					width             : 75, // Width of the button.
					action            : 'like', // What to display on the button. Default 'like'. Options: 'like', 'recommend'
					font              : 'arial', // The font on the button. Available fonts: 'arial', 'lucida grande', 'segoe ui', 'tahoma', 'trebuchet ms', 'verdana'
					colorscheme       : 'light' // Colors for the button. Default 'like'. Options: 'light', 'dark'
				};
					
			SLAYER.renderLike(likeParameter);
		}
};*/

var cash = {

		 
	init: function() {
		debugProxy("cash init is called");
		var container = $_jq('#cashLayerInner');
		var paymentHtml = $_jq('#PaymentLayerOuter');
		
        cash.openPaymentLayer();
        
        $_jq("#evoucher, #evoucher-button").click(function(e) {
			debugProxy("evoucher click handler triggered");
			e.preventDefault();
			
			if(this.id == 'evoucher-button') {
				debugProxy("trigger cashlayer click");
				$_jq('#cashLayer').trigger('click');
			}

			$_jq('#cashLayerOuter').children('.button').removeClass('selected');
	    	$_jq('a#evoucher').addClass('selected');
			container.empty();
			cash.showActivity();
			
			eVoucher.init();

			debugProxy("request backend for cash..stuff");
			$_jq.ajax({
				url: this.href,
			    type: 'POST',
			    dataType: 'html',
			    success: function(data) {
					debugProxy("response for cash..stuff");
			    	cash.hideActivity();
			    	container.html(data);
			    	$_jq.fancybox.resize();
			    }
			});
			
		});
		
		$_jq("#offerwall").click(function(e) {
			debugProxy("offerwall click handler triggered");
			e.preventDefault();
			$_jq('#cashLayerOuter').children('.button').removeClass('selected');
	    	$_jq('a#offerwall').addClass('selected');
			container.empty();
			cash.showActivity();
			
			$_jq.ajax({
				url: this.href,
			    type: 'POST',
			    dataType: 'html',
			    success: function(data) {
			    	container.html(data);
			    	$_jq.fancybox.resize();
			    }
			});
			
		});
		
		$_jq("#payment").click(function(e) {
			debugProxy("payment click handler triggered");
			e.preventDefault();
			
			$_jq('#cashLayerOuter').children('.button').removeClass('selected');
	    	$_jq('a#payment').addClass('selected');
	    	
			container.empty();
			cash.showActivity();
			
			$_jq.ajax({
				url: this.href,
			    type: 'POST',
			    dataType: 'html',
			    success: function(data) {
			    	cash.hideActivity();
			    	container.html(data);
			    	Payment.open();
			    	$_jq('#CloseLayer').css('display', 'none');
			    	$_jq('#PaymentLayer').show();
			    	$_jq.fancybox.resize();
			    	
			    }
			});
			
		});
		
	},
	openPaymentLayer: function (param,trigger) {
		debugProxy("openPaymentLayer function called");
		debugProxy(param);
		debugProxy(trigger);
        var container = $_jq('#cashLayerInner');
		var paymentHtml = $_jq('#PaymentLayerOuter');
        
		var fancybox = $_jq('#cashLayer').fancybox({
			'autoDimensions' : true,
			'autoScale': false,
			'onStart': function() {
				
				$_jq('#cashLayerOuter').children('.button').removeClass('selected');
				$_jq('a#payment').addClass('selected');
				
				container.html(paymentHtml);
				Payment.open(param);
		    	$_jq('#CloseLayer').css('display', 'none');
		    	$_jq('#PaymentLayer').show();
		    	
			},
			'onClosed' : function() {

				if($_jq('#PaymentLayer').length > 0) {
					Payment.closeLayer();
				}
				container.empty();
			}
		});
        if (false !== trigger && undefined !== trigger ) {
            
            fancybox.trigger("click");
        }
        
    },
            
	hideActivity: function() {
		$_jq.fancybox.hideActivity();
	},
	showActivity: function() {
		$_jq.fancybox.showActivity();
	}
};

var eVoucher = {
		
	selector: '#evoucherContainer',
	debug: false,
	
	init: function() {
		
		// register fancybox on the menu button
		//$_jq("#evoucher").fancybox({'type': 'ajax'}); 
		
		// register the click event
		$_jq('input[name=book]', eVoucher.selector).live("click", function() {
			eVoucher.book();
		});
	},
		
	book: function() {
		
		var form = $_jq('#evoucher-form');
		var request = $_jq('.evoucherRequest', eVoucher.selector);
		request.html(''); // clear request container
		
		cash.showActivity();
		
		$_jq.ajax({
			url: 'index.php?controller=user&action=evoucher',
		    type: 'POST',
		    dataType: 'json',
		    data: form.serializeArray(),
		    success: function(data) {
		    	
		    	cash.hideActivity();
		    	
		    	var json = data.result.evoucher, icon;
		    	
		    	if (json === undefined) json = {'success': false, 'message': 'Error: 501'}; // fallback
		    	
		    	if(json.success) {	
		    		icon = '<div class="icon icon-success"></div>';
		    		form.remove(); // remove form elements
		    	} else {
		    		icon = '<div class="icon icon-error"></div>';
		    	}
		    	
		    	if(eVoucher.debug) {
		    		console.log(json.debug);
		    	}

		    	if (json.paymentURL !== undefined) {
		    		Payment.openLayer({url: json.paymentURL}); // automaticlly close exists and open the payment layer
		    	} else {
		    		request.html(icon + '<p>'+json.message+'</p>');
		    	}
		    	
		    }
		});
	}
};

var tracking = {
		
	events: {
		login: 			{'event':'_trackEvent', 'category':'gsSt', 'action':'ply', 'label':'lg'},
		loginErrClose:  {'event': '_trackEvent', 'category':'gsSt', 'action':'erCl', 'label':'rg'},
		passwordForgot: {'event':'_trackEvent', 'category':'gsSt', 'action':'pwf', 'label':'lg'},
		signupOnForm: 	{'event':'_trackEvent', 'category':'gsSt', 'action':'rgBt', 'label':'rg'},
		signupOnButton: {'event':'_trackEvent', 'category':'gsSt', 'action':'plyBt', 'label':'st'},
		signupClose: 	{'event': '_trackEvent', 'category':'gsSt', 'action':'rgCl', 'label':'rg'},
		startClient: 	{'event':'_trackEvent', 'category':'gsPg', 'action':'plyBt', 'label':'ply'},
		autoStartClient:{'event':'_trackEvent', 'category':'gsPg', 'action':'atPly', 'label':'ply'}
	},
		
	push: function(options) {		
		if(typeof(options) == 'undefined') return false;
		_gaq.push([options.event, options.category, options.action, options.label]);
		return true;
	}
}

var User = {
	switchLanguage : function(language, redirectHref)
	{
		$_jq.ajax({
			type : "GET",
			url  : "index.php?controller=user&action=switchLanguage",
			data : "language="+language,
			success : function(result) {
				window.location.href = redirectHref;
			},
			error : function(error) {
			}
		});
		return false;
	}
}
 
var socialHandler = new SocialHandler();
 
function SocialHandler()
{
    this.openWindow = function(name)
    {
    	var urls = new Array();
 
    	urls["facebook"] = "//www.facebook.com/piratestorm";
    	urls["facebookAr"] = "//www.facebook.com/qarasena";
    	urls["google"] = "http://plus.google.com/";
    	urls["twitter"] = "//www.twitter.com/PirateStorm";
 
    	if(urls[name]) {
    		window.open(urls[name]);
    	}
 
    	return false;
 
    }
}

/* Awesome AjaxCaller for loading stuff asynchronous from awesome piratestorm-servers.  */
var AjaxCaller = {
 
		call: function(subAction){
			var sResponse = 'error';
			$_jq.ajax({
				type : "GET",
				dataType: "json",
				url  : "index.php",
				data: ({controller : 'ajax', action : 'call', subAction : subAction}),
				async: false,
 
				success: function(json){
	              if((json.result.state) && (json.result.state == "ok")){
	            	  sResponse = json.result.content;
	              }
	       	   }
			});
			return sResponse;
		}
}
 
var mediaSlider = new MediaSlider();
 
function MediaSlider()
{
 
    this.activePage = [];
    this.pages = [];
    this.showOnPage = 5;
    this.defaultImageSize = 170 + 2;
    this.maxWidth = [];
    this.pageWidth = [];
 
    this.sliderElement = null;
 
    this.init = function()
    {
 
        this.pages['screenshots'] = Math.ceil(($_jq('#screenshots').children().length)/this.showOnPage);
        this.activePage['screenshots'] = 0;        
        this.pageWidth['screenshots'] = Math.ceil(this.showOnPage*this.defaultImageSize);
        this.maxWidth['screenshots'] = Math.ceil($_jq('#screenshots').children().length*this.defaultImageSize);
        $_jq('#screenshots').css('width', this.maxWidth['screenshots']);
 
        this.pages['conceptart'] = Math.ceil(($_jq('#conceptart').children().length)/this.showOnPage);
        this.activePage['conceptart'] = 0;
        this.pageWidth['conceptart'] = Math.ceil(this.showOnPage*this.defaultImageSize);
        this.maxWidth['conceptart'] = Math.ceil($_jq('#conceptart').children().length*this.defaultImageSize);
        $_jq('#conceptart').css('width', this.maxWidth['conceptart']);
 
        this.pages['wallpapers'] = Math.ceil(($_jq('#wallpapers').children().length)/this.showOnPage);
        this.activePage['wallpapers'] = 0;
        this.pageWidth['wallpapers'] = Math.ceil(this.showOnPage*this.defaultImageSize);
        this.maxWidth['wallpapers'] = Math.ceil($_jq('#wallpapers').children().length*this.defaultImageSize);
        $_jq('#wallpapers').css('width', this.maxWidth['wallpapers']);
 
    }
 
    this.slideLeft = function(type)
    {
        this.slideTo(type, this.activePage[type]-1)
    }
 
    this.slideRight = function(type)
    {
        this.slideTo(type, this.activePage[type]+1)
    }
 
    this.slideTo = function(type, page)
    {
        if(this.activePage[type] != page && page >= 0 && page <= this.pages[type]-1) {
            if(this.activePage[type] < page) {
                var rightOffset = '+=' + (this.pageWidth[type] * (page-this.activePage[type]));
            } else {
                var rightOffset = '-=' + (this.pageWidth[type] * (this.activePage[type] - page));
            }
            this.activePage[type] = page;
 
            $_jq('#' + type).animate({
                right: rightOffset
            }, 250);
 
        } else if (this.activePage[type] != page && page < 0 || page > this.pages[type]-1) {
        	if(this.activePage[type] < page) {
                var rightOffset = '-=' + (this.pageWidth[type] * (this.pages[type]-1));
                this.activePage[type] = 0;
            } else {
                var rightOffset = '+=' + (this.pageWidth[type] * (this.pages[type]-1));
                this.activePage[type] = this.pages[type]-1;
            }
 
            $_jq('#' + type).animate({
                right: rightOffset
            }, 250);
        }
    }
}
 
var animationHandler = new animationHandler();
 
function animationHandler() {
 
	this.init = function() {}
 
	this.pulsate = function(elem) {
		var elem = $_jq(elem);
		elem.effect('pulsate', {times:100}, 1000);		
	}
 
	this.pulsateHover = function(elem1, elem2) {
		var elem1 = $_jq(elem1);
		var elem2 = $_jq(elem2);
 
		elem1.hover(function() {
			elem2.effect('pulsate', {times:100}, 1000);
		});
 
		elem1.mouseout(function() {
			elem2.stop(true, true); 
			elem2.fadeOut(200);
	   });
	}
}

var cinema = {
    init: function () {
        $_jq.ajax({
				type : "GET",
				url  : "index.php",
				data: ({controller : 'user', action : 'cinema'}),
				async: true,
 
				success: function(data){
	              $_jq("#cinema").html(data);
	       	   }
        });
    },
    close: function () {
        $_jq("#cinema").empty();
    }
}

$_jq().ready(function() {
    $_jq("#qtPayment").click(function() {
        openExternalLink(Payment.generateURL());
        return;
    });
});
