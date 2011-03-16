<h1>Step Input jQuery Plugin<h1>

<p>This plugin can be used in conjunction with text boxes to increment/decrement values by a fixed value. The increment/decrement can be done using either arrow keys or buttons added by the plug-in. Format in currency style (US only) is also available.</p>

<h3>Usage</h3>
To use the plugin just add
jQuery('#element').stepinput();

<h3>Options</h3>
Following configurable options are available:
<ul>
	<li>increment - value to be incremented by (default = 1000)</li>
	<li>minVal - min value allowed (default = -1000000)</li>
	<li>maxVal - max value allowed (default = 1000000)</li>
	<li>showCurrencySymbol -  should currency symbol be displayed (default = true)</li>
	<li>currencySymbol - currency symbol to be displayed (default = $)</li>
	<li>currencySymbolBefore - currency symbol displayed before value (default = true)</li>
	<li>showButtons - should increment/decrement buttons should be displayed (default = true)</li>
	<li>useArrowKeys - should increment/decrement using arrow keys be allowed (default = true)</li>
	<li>formatAsCurrency - should value be formatted as currency (US only) (default = true)</li>
	<li>showErrorMessage - should error messages be shown (default = true)</li>
	<li>errorMessage - invalid number error message (default = This is not a valid number!)</li>
	<li>minErrorMessage - minimum value breached message (default = Value is smaller than minimum value!)</li>
	<li>maxErrorMessage - maximum value breached message (default = Value is greater than maximum value!)</li>
	<li>errorMessageClass - css class for error message (default = step_input_error)</li>
	<li>incButtonClass - css class for increment button (default = step_input_inc)</li>
	<li>decButtonClass - css class for decrement button (default = step_input_dec)</li>
</ul>
