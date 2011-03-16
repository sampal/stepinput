/*!
 * jQuery Step Input Plug-in v1.0
 *
 * Author Samik Pal
 *
 * Date: Wed Mar 16 13:10:53 2011 -0500
 */
(function($){
    $.fn.extend({

        stepinput: function(options) {
			var defaults = {
				increment: 1000,
				minVal: -1000000,
				maxVal: 1000000,
				showCurrencySymbol: true,
				currencySymbol: '$',
				currencySymbolBefore: true,
				showButtons: true,
				useArrowKeys: true,
				formatAsCurrency: true,
				showErrorMessage: true,
				errorMessage: 'This is not a valid number!',
				errorMessageClass: 'step_input_error',
				minErrorMessage: 'Value is smaller than minimum value!',
				maxErrorMessage: 'Value is greater than maximum value!',
				incButtonClass: 'step_input_inc',
				decButtonClass: 'step_input_dec' 
			};  
			var options = $.extend(defaults, options);

            return this.each(function() {
                var obj = $(this);
				if(options.useArrowKeys){
					obj.bind({
						keydown: function(event) {return obj.bindArrowKeys(event, options)}
					});
				}
				if(options.showButtons){
					obj.createButtons(options);
				}else{
					if(options.showErrorMessage){
						obj.after($('<div id = "' + obj.attr('id') + '_error" class="' + 
							options.errorMessageClass + '"></div>'));
					}
				}
            });
        },

		bindArrowKeys: function(event, options) {
			var t = this;
			$('#' + t.attr('id') + '_error').html('');
			switch (event.which){
				case 38: t.doIncrement(options, true);
						 return;
                case 40: t.doIncrement(options, false);
						 return;
			}
			return;
		},

		createButtons: function(options) {  
			var t = jQuery(this);
            var decContainer = $('<span id = "' + t.attr('id') + '_dec" />');
			decContainer.bind({
				mousedown: function(event) {t.doIncrement(options, false)}
			})
			decContainer.addClass(options.decButtonClass);
			t.before(decContainer);
			var incContainer = $('<span id = "' + t.attr('id') + '_inc" />');
			incContainer.bind({
				mousedown: function(event) {t.doIncrement(options, true)}
			})
			incContainer.addClass(options.incButtonClass);
			t.after(incContainer);
			if(options.showErrorMessage){
				incContainer.after($('<div id = "' + t.attr('id') + '_error" class="' + 
					options.errorMessageClass + '"></div>'));
			}
        },

		doIncrement: function(options, isPositive){			
			var t = this;
			$('#' + t.attr('id') + '_error').html('');
			var initVal = t.val();
			if(!isNumber(initVal, options)){
				$('#' + t.attr('id') + '_error').html(options.errorMessage);
				return;
			}
			var increment = options.increment;
			if(isPositive){
				increment *= -1;
			}
			var newVal = removeSeparator(initVal, options) - increment;
			if (newVal < options.minVal){
				$('#' + t.attr('id') + '_error').html(options.minErrorMessage);
			} else if(newVal > options.maxVal){
				$('#' + t.attr('id') + '_error').html(options.maxErrorMessage);
			} else{
				if(options.formatAsCurrency){
					t.val(formatAsCurrency(newVal, options));
				}else{
					t.val(newVal);
				}
			}
		}

    });
})(jQuery);

function isNumber(txt, options){
	var number = removeSeparator(txt, options);
	return !isNaN(number -1);
}

function removeSeparator(txt, options){
	var thousandSeparator = ",";
	var currencySymbol = options.currencySymbol;
    if (typeof(txt) != "undefined") {
        if(txt.indexOf(thousandSeparator) >= 0){
          txt = txt.replace(new RegExp(thousandSeparator, 'g'), '')
        }
		if(txt.indexOf(currencySymbol) >= 0){
			txt = txt.replace(currencySymbol, '');
		}
        return txt;
    }
    return '';
}

function formatAsCurrency(num, options) {
	var thousandSeparator = ",";
	var decimalSeparator = ".";
    num = number_with_precision(num);
    var isNegative = false;
    if(num < 0){
      num = num.toString().substr(1, num.length);
      isNegative = true;
    }else{
      num = num.toString();
    }
    a = num.split(decimalSeparator);
    x = a[0];
    y = a[1];
    z = "";
    if (typeof(x) != "undefined") {
      for (i=x.length-1;i>=0;i--){
        z += x.charAt(i);
      }
      z = z.replace(/(\d{3})/g, "$1" + thousandSeparator);
      if (z.slice(-thousandSeparator.length) == thousandSeparator){
        z = z.slice(0, -thousandSeparator.length);
      }
      x = "";
      for (i=z.length-1;i>=0;i--){
        x += z.charAt(i);
      }
      if (typeof(y) == "undefined"){
        y = '00';
      }else if(y.length ==1){
        y += '0'
      }
      x += decimalSeparator + y;
    }
    if(isNegative){
      x = '-' + x
    }
	if(options.showCurrencySymbol){
		if(options.currencySymbolBefore){
			x = options.currencySymbol + x;
		}else{
			x = x + options.currencySymbol;
		}
	}
    return x;
}

function number_with_precision(number){
    var newnumber = Math.round(number*Math.pow(10, 2))/Math.pow(10, 2);
    newnumber = newnumber.toString();
    a = newnumber.split(".");
    x = a[0];
    y = a[1];
    if (typeof(y) == "undefined"){
      y = '00';
    }else if(y.length ==1){
      y += '0';
    }
    return x + "." + y;
}