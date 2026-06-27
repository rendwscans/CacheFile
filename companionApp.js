
var CompanionApp = function() {
	
	/**
	 * PRIVATE
	 */
	
	var _url = 'index.php?controller=user&action=compapp';
	var _container = '#compAppContainer';
	var _element = '#time';
	var _button = '#generateCode';
	var _time = null;
	var _interval = null;
	var _code = null;
	var _isExpired = false;
	var _isRunning = false;
	var _isInitialized = false;
	var _isError = false;
	var _jQuery = $_jq;
	
	var _update = function() {
			
		_jQuery.fancybox.showActivity();
		
		_jQuery.ajax({
			url: _url,
			type: 'POST',
			data: {'generateCode': true },
			dataType: 'json',
			success: function(result) {
				
				if(result.error) {
					_stop();
					_drawError(result.error);
					_jQuery.fancybox.hideActivity();
				} else {
					_code = result.code;
					_time = result.time;
					_restart();
				}
			}		
		});
	};

	var _restart = function() {
		
		_stop();

		_jQuery('.timer').show();
		_jQuery('.code').show();
		_jQuery('.expired').hide();			
			
		_start();
		
		_jQuery.fancybox.hideActivity();
	};
		
	var _start = function() {

		_isRunning = true;
		_isError = false;
			
		_jQuery('.code').text(_code);
		
		_drawTimer(_time);
		
		_interval = setInterval(function() {

			if(_time <= 1) {
				_stop();
			} else {				
				_drawTimer(--_time);
			}
			
		}, 1000);
	};
	
	var _drawTimer = function(time) {
		
		var minutes = Math.floor(_time / 60);
		var seconds = _time - minutes * 60;
		var minutes = ((minutes < 10) ? "0" + minutes : minutes);
		var seconds = ((seconds < 10) ? "0" + seconds : seconds);
		var timer = minutes + ':' + seconds;

		_jQuery(_element).text(timer);
	};
	
	var _drawError = function(errormsg) {
		
		_isError = true;
		_jQuery('.message').text(errormsg);
		
	};
	
	var _stop = function() {
			
		_isRunning = false;
		_isExpired = true;
		
		window.clearInterval(_interval);
			
		_jQuery('.code').empty();
		_jQuery('.timer').hide();
		_jQuery('.code').hide();
		
		if(false === _isError) { 
			_jQuery('.expired').show();
		}

		_jQuery(_element).text('00:00');
			
	};
	
	/**
	 * PUBLIC
	 */
	return {
		
		init: function(code, time, element, jQuery) {

			if(null != code) {
				_code = code;
			}
				
			if(null != time) {
				_time = time;
			}
			
			if(null === element) {
				_element = element;
			}
			
			if(null === jQuery) {
				_jQuery = jQuery;
			}
			
			if(_isRunning) {
				_restart();
			} else {
				_start();
			}
			
			if(false == _isInitialized) {
			
				_jQuery(_button, _jQuery(_container)).live("click", function(e) {
						
					e.preventDefault();
						
					if(_isRunning || false == _isExpired) {
						return false;
					}
						
					_update();
				});
				
				_isInitialized = true;
			}
		},
		
		restart: function() {
			_update();
		}
	}
}

var compApp = new CompanionApp();
