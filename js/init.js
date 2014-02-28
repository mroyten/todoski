if (typeof localStorage.length != "number") {
	alert("Sorry this browser doesn't support local storage");
}

//todoski name space
var TD = TD || {};

//set storage & DOM methods
TD = {
	prefix : 'td_',
	
	/*
	 * return 2 digit number
	 * parm@ num : number
	 * */
	digit : function(num) {
		var zero = '0';
		if (num <= 9) {
			return zero + num;
		} else {
			return num;
		}
	},
	
	//retrieve current length of item to do index
	index : function() {
		var index = $('.itemToDo').length;
		return this.digit(index);
	},
	
	/*
	 * add item to DOM
	 * param@ toDoItem : string - item to do 
	 */
	addToDom : function(toDoItem) {
		var $listItemToDo = $('<li class="itemToDo">' + toDoItem + '</li>'),
			$itemsToDo = $('#itemsToDo');
		
		$listItemToDo.appendTo($itemsToDo);
	},
	
	/*
	 * rename the keys according the their current index
	 */
	reNameKeys : function() {
		var listing = $('#itemsToDo').children().not('.ui-sortable-placeholder').toArray(),
			count = 0,
			zero = '0',
			self = this;
			td_ = self.prefix;
		
		//clear the keys - TODO add function here to loop through keys to remove keys that start with 'td_' 
		this.clearKeys();
		
		$.each(listing, function() {
			count++;
			var value = this.innerHTML,
				$this = $(this),
				theNewVal = td_ + self.digit(count) + value;
			
			//do not set items that are set to have been 'completed'
			($this.hasClass('completed')) ?	count-- : localStorage.setItem(theNewVal, theNewVal)
		});
	},
	
	//TODO iterate over localStorage and pull out the prefix keys of 'td_'
	clearKeys : function() {
		localStorage.clear();
	},
	
	//add a function to 1st arg to apply to each localStorage 
	storageValues : function(fn) {
		var storageLength = localStorage.length,
			i, key, prefix, value, index, valuePrefix;
			
		for (i = 0; i < storageLength; i++ ) {
			key = localStorage.key(i),
			prefix = key.slice(0,3),		//slice off the td_ prefix
			valuePrefix = key.slice(5); 	//slice off the count
			
			if (prefix !== this.prefix) continue;	//only publish todos with proper prefix
			
			fn(valuePrefix);
		}
	}
};

$(document).ready(function() {
	// Build all of the remaining to Dos from Local Storage	
	TD.storageValues(TD.addToDom);
});


