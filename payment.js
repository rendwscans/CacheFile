var Payment = {
    url: null,
    iFramecallback: function () {
        $_jq('#PaymentLoading').hide();
    },
    closeLayer: function () {
        if (($_jq('#PaymentLayer').css('display') != 'none')) {
            $_jq('#PaymentLayer').hide();
            clientHandler.handleVisibilty();
        }
    },
    open: function(param) {
        if(undefined === param) {
            param = null;
        }

        var sURL = param;
        if(null === Payment.url) {
            if (typeof param !== "string") {
                sURL = this.generateURL(param);
            }
        } else {
            sURL = Payment.url;
        }
        if (typeof openExternalLink === "function") {
            openExternalLink(sURL);
        } else {
            this.openIframe(param);
        }
    },
   /**
    * Open iFrame as overlay on client.
    * 
    * @param {object} param parameters to generate payment url
    */
    openIframe: function(param) {
        if(undefined === param) {
            param = null;
        }

        var sURL = param;
        if (null === Payment.url) {
            if (typeof param !== "string") {
                this.debug("create Payment.url");
                sURL = this.generateURL(param);
            }
        } else {
            sURL = Payment.url;
        }

        this.debug("payment url created:" + sURL);

        if (typeof openExternalLink === "function") {
            openExternalLink(sURL);
        } else {
            this.openIframe(param);
        }
    },

    debug: function (message) {
        if (typeof debugMessage === "function") {
            debugMessage(message);
        }
        console.log(message)

    },

    /**
     * Open iFrame as overlay on client.
     *
     * @param {object} param parameters to generate payment url
     */
    openIframe: function (param) {
        if (undefined === param) {
            param = null;
        }

        var sURL = param;
        if (null === Payment.url) {
            if (typeof param !== "string") {
                sURL = this.generateURL(param);
            }
        } else {
            sURL = Payment.url;
        }
        this.debug("requesting open IFrame: " + sURL);
        clientHandler.handleVisibilty();

        $_jq('#PaymentLoading').show();
        $_jq('#PaymentLayer').show();
        $_jq('#PaymentIFrame').attr('src', sURL);

        Payment.url = null;

        return true;
    },
    /**
     * Open iFrame as overlay in fancybox
     */
    openLayer: function (param) {
        var sUrl = param.url;
        Payment.url = sUrl;

        this.debug("requesting open Layer: " + sUrl);
        $_jq('#payment').trigger('click');

        return true;
    },
    order: function (sOrderInfo) {
        this.debug("requesting order info: " + sOrderInfo);
        clientHandler.handleVisibilty();
        var order_info = sOrderInfo;

        // calling the API ...
        var obj = {
            method: 'pay',
            order_info: order_info,
            purchase_type: 'item',
            dev_purchase_params: {'oscif': true}
        };

        FB.ui(obj, callback);
    },

    generateURL: function (param) {
        this.debug("create payment url.");
        if (null === param) {
            this.debug("no parameters for creating payment url");
            param = {};
        }

        var sURL = '';
        $_jq.ajax({
            url: 'index.php?controller=ajax&action=call&subAction=generatePaymentURL',
            type: 'GET',
            async: false,
            dataType: 'json',
            data: param,
            success: function (data) {
                sURL = data.result.url;
            }
        });
        this.debug("url created: " + sURL);
        return sURL;
    }
};

var callback = function (data) {
    clientHandler.handleVisibilty();
    if (data['order_id']) {

        return true;
    }

    return false;
};
