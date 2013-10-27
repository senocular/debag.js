/**
 * Wraps the console object with a custom implementation that generates 
 * less-than-polite (D-bag) expressions with calls to certain methods.
 */
(function(window){

	// methods to be overridden by the debag console
	var overrides = ["debug", "log", "info", "warn", "error"];

	function DebagConsole (nativeConsole){
		this.nativeConsole = nativeConsole;
	}
	
	// determines the debag saying to include with a call
	DebagConsole.prototype.getQuote = function(methodName, inputArgs){

		// INSERT LOGIC FOR SELECTING DEBAG PHRASES HERE

		return "You fail at life. Oh, by the way:";
	};
	
	// applies overrides for a methods by name
	DebagConsole.prototype.setupOverrides = function(overrides){
		var methodName;
		for (var i=0, n=overrides.length; i<n; i++){
			methodName = overrides[i];
			this[methodName] = generate(methodName);
		}
	};

	// generates a generic override method
	function generate(methodName){
		return function(){
			var args = [this.getQuote(methodName, arguments)];
			args.push.apply(args, arguments);
			this.nativeConsole[methodName].apply(this.nativeConsole, args);
		};
	}


	if (window.console.toString() === "[object Console]"){
		var debag = new DebagConsole(window.console);
		debag.setupOverrides(overrides);
		window.console = debag;
	}

	return DebagConsole;

})(window);