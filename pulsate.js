/* Awesome Pulsate by awesome flazer 2011 */
var Pulsate = {
		
		aData: new Array(),
		aFade: new Array(),
		bIsFading: false,
		oTimer: null,
		bPulsate: true,
		
		
		
		init: function(sContainerElem, iTime, iMin, iMax, bOnLoad){
			Pulsate.aData['Container'] = $_jq('#' + sContainerElem);
			Pulsate.aData['Active'] = $_jq('#' + sContainerElem +' .' + 'glow');
			Pulsate.aData['DeActive'] = $_jq('#' + sContainerElem +' .' + 'normal');
			Pulsate.aData['Interval'] = iTime;
			Pulsate.aData['hold'] = 100;
			Pulsate.aFade['min'] = iMin;
			Pulsate.aFade['max'] = iMax;
			if(bOnLoad){
				Pulsate.startAnimation();
			}else{
				Pulsate.aData['Container'].mouseenter(function(){ Pulsate.startAnimation();});
				Pulsate.aData['Container'].mouseleave(function(){ Pulsate.bPulsate = false; });
			}
		},
		
		startAnimation: function(){
			if(!Pulsate.bIsFading){
				Pulsate.bIsFading = true;
				Pulsate.aData['Active'].fadeTo(
											Pulsate.aData['Interval'],
											Pulsate.aFade['max'],
											function(){
												Pulsate.oTimer = setTimeout(function(){ Pulsate.fadeOut();}, Pulsate.aData['hold']);
											}
										);
			}
		},
		
		fadeOut: function(){
			clearTimeout(Pulsate.oTimer);
			Pulsate.aData['Active'].fadeTo(
					Pulsate.aData['Interval'],
					Pulsate.aFade['min'],
					function(){
						Pulsate.oTimer = setTimeout(function(){
							if(Pulsate.bPulsate){
								Pulsate.oTimer = setTimeout(function(){ Pulsate.bIsFading = false; Pulsate.startAnimation();}, Pulsate.aData['hold']);
							}else{
								Pulsate.bIsFading = false;
								Pulsate.bPulsate = true;
							}
						}, 
						Pulsate.aData['hold']);
					});
		}
}