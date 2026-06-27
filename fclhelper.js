
//FCL.init({cdnHost:"tester.test.de", cvsJsonFileCv:'', apiHost:'', layerName:''});

FCL = {
        jsHealth:false,
        clientLoaded:false,
        cdnHost: '',
        cvsJsonFileCv: '',
        swfcv:'',
        apiHost: '',
        layerName: '',
        blockingTestLayer: '',

        fallbackIntervall: 'undefined',
        fallbackCounter: 21,
        fallbackCount: 0,

    init : function(params){

        if (params.cdnHost)this.cdnHost = params.cdnHost;
        if (params.cvsJsonFileCv)this.cvsJsonFileCv = params.cvsJsonFileCv;
        if (params.apiHost)this.apiHost = params.apiHost;
        if (params.layerName)this.layerName = params.layerName;
        if (params.blockingTestLayer)this.blockingTestLayer = params.blockingTestLayer;
        if (params.swfcv) this.swfcv = params.swfcv;
    },



    enableBgPreloader : function() {
        flashembed('FlashLayer', {
			src: '/flash/FileCacheloader.swf',
			version: [11, 0], // @todo 11.2
			id: 'fileCacheLoader',
			name: 'fileCacheLoader',
			quality: 'high',
	        scale: 'noscale',
	        wmode: 'direct',
            width: 1,
            height:1,
            bgcolor: '#000000',
	        allowscriptaccess: 'always',
	        allowFullScreen: 'false',
			onFail: function() {
				console.log('Failed to load flieCacheLoader');
			}
		}, {
			cdnHost: this.cdnHost,
            cvsJsonFileCv: this.cvsJsonFileCv,
            apiHost: this.apiHost,
            SWFCV: this.swfcv
		});
         //swfobject.embedSWF("/swf/fileCacheloader.swf", this.layerName, "1", "1", "10.0.0", "/swf/expressInstall.swf", nflashvars, nparams);
    },



    preloadswfs_DONE : function(){
         var flash = document.getElementById("fileCacheLoader");
         if(flash){
            var divContainer = flash;
            divContainer.shutDown(); ///swf callback
            if (divContainer.parentNode)divContainer.parentNode.removeChild(divContainer);
         }
    },



    debug : function (log_txt) {

         if (typeof window.console != 'undefined') {
            console.log(log_txt);
         }
    },



    triggerPreloadSwfs : function (){
         var flash =  document.getElementById("fileCacheLoader");
         if(flash){
             flash.preloadContent();
         }
    },


    blockDetection : function (){
        if (this.blockingTestLayer == "")return;
        var myDiv =  document.getElementById(this.blockingTestLayer);
        if(!myDiv){
                this.preloadswfs_DONE();
                showClient();
                loadSWF();
        }
    },


    namespace : function(baseName){
        var ns = baseName.split('.');
        var o = window;
        for (var i=0, l=ns.length; i < l; i++){
            o = o[ns[i]] = o[ns[i]] || {};
        }
        return o;
    },


    fallbackStart: function(){
        this.fallbackIntervall = self.setInterval(function(){FCL.fallbackCheck()}, 1000);
    },

    fallbackCheck:function(){

        this.fallbackCount ++;
        if (this.fallbackCount >= this.fallbackCounter){
            window.clearInterval( this.fallbackIntervall );
           if (!this.jsHealth && !this.clientLoaded){
               loadSWF();
               showClient();  ///hide other
               this.cleanUpAd();
           }

        }
    },

    cleanUpAd:function(){
        var inner = $_jq('#ibAdPlayer').innerHTML;

        if (inner){
            //not on IE8
            document.getElementById("ibAdPlayer").innerHTML = '';
            document.getElementById("ibAdPlayer").style.display = 'none';
        }

        $_jq('#adContainer').empty();
        $_jq('#adContainer').remove();
        this.preloadswfs_DONE();
    }

    };
  /*
    fallback: new Date().getTime(),
    fallbackInterval : 1000 * parseInt(8),
    fallbackMax : new Date().getTime() + 30000,



    fallbackStart: function(){
        fallbackCheck();
    },


    fallbackEnd: function(){
    if (FCL.clientLoaded == false){
        FCL.debug("logger -----" +$_jq('#ibAdPlayer').is("div"));
        /// player status needed
        if ($_jq('#ibAdPlayer').is("div")){
            loadSWF();
            showClient();
        }
    }
    },

    fallbackSet: function(){
    fallback = new Date().getTime();
    },


    fallbackCheck: function(){
    if (fallback < new Date().getTime() - fallbackInterval) {
        fallbackEnd();
        return true;
    } else if (fallbackMax < new Date().getTime()) {
        fallbackEnd();
        return true;
    }
    window.setTimeout('fallbackCheck()', 1000);
    }
  */



