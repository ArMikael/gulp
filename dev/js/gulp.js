(function(){
	'use strict';

	var newVar = 10;
	
	newVar = newVar++;

	if (newVar) {
		console.log('True');
	}

	console.log(newVar);

})();