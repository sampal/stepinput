module("Number Utils");

test('number_with_precision()', function() {
	ok(number_with_precision(0) == '0.00', '0 should return 0.00');
	ok(number_with_precision(1.0) == '1.00', '1.0 should return 1.00');
	ok(number_with_precision(-4) == '-4.00', '-4 should return -4.00');
	ok(number_with_precision(7.5) == '7.50', '7.5 should return 7.50');
	ok(number_with_precision(10) == '10.00', '10 should return 10.00');
	ok(number_with_precision(239.677) == '239.68', '239.677 should return 239.68');
	ok(number_with_precision(23.67) == '23.67', '23.67 should return 23.67');
})

test('formatAsCurrency()', function() {
	ok(formatAsCurrency(0, test_options) == '$0.00', '0 should return $0.00');
	ok(formatAsCurrency(1.0, test_options) == '$1.00', '1.0 should return $1.00');
	ok(formatAsCurrency(-5, test_options) == '$-5.00', '-5 should return $-5.00');
	ok(formatAsCurrency(6.98, test_options) == '$6.98', '6.98 should return $6.98');
	ok(formatAsCurrency(6.999, test_options) == '$7.00', '6.999 should return $7.00');
	test_options.currencySymbolBefore = false;
	test_options.currencySymbol = 'USD';
	ok(formatAsCurrency(0, test_options) == '0.00USD', '0 should return 0.00USD');
	ok(formatAsCurrency(1.0, test_options) == '1.00USD', '1.0 should return 1.00USD');
	ok(formatAsCurrency(-5, test_options) == '-5.00USD', '-5 should return -5.00USD');
	ok(formatAsCurrency(6.98, test_options) == '6.98USD', '6.98 should return 6.98USD');
	ok(formatAsCurrency(6.999, test_options) == '7.00USD', '6.999 should return 7.00USD');
	test_options.currencySymbolBefore = true;
	test_options.currencySymbol = '$';
	test_options.showCurrencySymbol = false;
	ok(formatAsCurrency(0, test_options) == '0.00', '0 should return 0.00');
	ok(formatAsCurrency(1.0, test_options) == '1.00', '1.0 should return 1.00');
	ok(formatAsCurrency(-5, test_options) == '-5.00', '-5 should return -5.00');
	ok(formatAsCurrency(6.98, test_options) == '6.98', '6.98 should return 6.98');
	ok(formatAsCurrency(6.999, test_options) == '7.00', '6.999 should return 7.00');
	test_options.showCurrencySymbol = true;
})

test('removeSeparator()', function() {
	ok(removeSeparator('0', test_options) == '0', '0 should return 0');
	ok(removeSeparator('1,000.0', test_options) == '1000.0', '1.0 should return 1000.0');
	ok(removeSeparator('-4,000', test_options) == '-4000', '-4000 should return -4000');
	ok(removeSeparator('7,000,000.56', test_options) == '7000000.56', '7,000,000.56 should return 7000000.56');
	ok(removeSeparator('$10.00', test_options) == '10.00', '$10 should return 10.00');
	ok(removeSeparator(undefined, test_options) == '', 'undefined should return blank');
})

test('isNumber()', function() {
	ok(isNumber('0', test_options), '0 is a number');
	ok(isNumber('1,000.0', test_options), '1.0  is a number');
	ok(isNumber('-4,000', test_options), '-4000  is a number');
	ok(isNumber('7,000,000.56', test_options), '7,000,000.56  is a number');
	ok(isNumber('$10.00', test_options), '$10 is a number');
	ok(!isNumber('Nothing', test_options), 'Nothing is not a number');
})

module("Step Input", {
   setup: function() {          
      $('#someContent').append('<input id="step_input" type="textbox" value="$10,000" />');
   },
   teardown: function() {
      $('#someContent').empty();          
   }
});

test('Step Input with default options', function() {
	$('#step_input').stepinput();
	ok($('#step_input_inc').length > 0, 'Increment link should be present');
	ok($('#step_input_dec').length > 0, 'Decrement link should be present');
})

test('Step Input with no buttons', function() {
	$('#step_input').stepinput({
		showButtons: false
	});
	ok($('#step_input_inc').length == 0, 'Increment link should not be present');
	ok($('#step_input_dec').length == 0, 'Decrement link should not be present');
	ok($('#step_input').next().attr('id') == 'step_input_error', 'Error div should be present after input field');
})

test('Step Input with no usage of arrow keys', function() {
	$('#step_input').stepinput({
		useArrowKeys: false
	});
	ok(typeof($('#step_input').data('events')) == "undefined", 'Arrow keys should not be bound');
})

test('Use arrow keys', function() {
	$('#step_input').stepinput();
	var e = $.Event('keydown');
	e.which = 38;
	$('#step_input').trigger(e);
	ok($('#step_input').val() == '$11,000.00', 'Value of input field should increase by 1000');
	$('#step_input').val(10000);
	e.which = 40;
	$('#step_input').trigger(e);
	ok($('#step_input').val() == '$9,000.00', 'Value of input field should reduce by 1000');
	$('#step_input').val(10000);
	e.which = 50;
	$('#step_input').trigger(e);
	ok($('#step_input').val() == '10000', 'On other key downs nothing should happen');
})

test('Create buttons for increment/decrement', function() {
	$('#step_input').createButtons(test_options);
	ok(typeof($('#step_input_inc').data('events')['mousedown']) != "undefined", 'Increment button should have mouse down event');
	ok(typeof($('#step_input_dec').data('events')['mousedown']) != "undefined", 'Decrement button should have mouse down event');
	ok($('#step_input_inc').next().attr('id') == 'step_input_error', 'Error div should be present after increment link');
})

test('Exception cases for increment/decrement', function() {
	$('#step_input').stepinput();	
	var e = $.Event('keydown');
	e.which = 38;
	$('#step_input').val('-100000000');
	$('#step_input').trigger(e);
	ok($('#step_input_error').html() == 'Value is smaller than minimum value!', 'Less than minimum error should be displayed');
	e.which = 40;
	$('#step_input').val('100000000');
	$('#step_input').trigger(e);
	ok($('#step_input_error').html() == 'Value is greater than maximum value!', 'Greater than maximum error should be displayed');
	$('#someContent').empty();  
	$('#someContent').append('<input id="step_input" type="textbox" value="$10,000" />');
	$('#step_input').stepinput({
		formatAsCurrency: false
	});
	$('#step_input').val('1000');
	$('#step_input').trigger(e);
	ok($('#step_input').val() == '0', 'Number will not be formatted as currency');
	$('#step_input').val('abc');
	$('#step_input').trigger(e);
	ok($('#step_input_error').html() == 'This is not a valid number!', 'abc is  not a number');
})