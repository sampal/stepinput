Step Input jQuery Plugin

This plugin can be used in conjunction with text boxes to increment/decrement values by a fixed value. The increment/decrement can be done using either arrow keys or buttons added by the plug-in. Format in currency style (US only) is also available.

To use the plugin just add
jQuery('#element').stepinput();

Following configurable options are available:
increment - value to be incremented by (default = 1000)
minVal - min value allowed (default = -1000000)
maxVal - max value allowed (default = 1000000)
showCurrencySymbol -  should currency symbol be displayed (default = true)
currencySymbol - currency symbol to be displayed (default = $)
currencySymbolBefore - currency symbol displayed before value (default = true)
showButtons - should increment/decrement buttons should be displayed (default = true)
useArrowKeys - should increment/decrement using arrow keys be allowed (default = true)
formatAsCurrency - should value be formatted as currency (US only) (default = true)
showErrorMessage - should error messages be shown (default = true)
errorMessage - invalid number error message (default = This is not a valid number!)
minErrorMessage - minimum value breached message (default = Value is smaller than minimum value!)
maxErrorMessage - maximum value breached message (default = Value is greater than maximum value!)
errorMessageClass - css class for error message (default = step_input_error)
incButtonClass - css class for increment button (default = step_input_inc)
decButtonClass - css class for decrement button (default = step_input_dec)

