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
	 * add item to LocalStorage
	 * param@ toDoItem : string - item to do 
	 * param@ domIndex : string - dom index number
	 */
	addStorage: function(toDoItem, domIndex) {
		var toDoKey;
		
		if (domIndex) {
			toDoKey = this.prefix + domIndex + toDoItem;	// if item isn't at the end of dom index
		} else {
			toDoKey = this.prefix + this.index() + toDoItem;	//send to end of children's list
		}
		
		localStorage.setItem(toDoKey, toDoKey);
	},
	
	/*
	 * remove item to LocalStorage
	 * param@ toDoItem : string - item to do 
	 * param@ domIndex : string - dom index number
	 */
	removeStorage: function(toDoItem, domIndex) {
		var toDoKey = this.prefix + domIndex + toDoItem;
		localStorage.removeItem(toDoKey);
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
		var listing = $('#itemsToDo').children().not('.ui-sortable-placeholder').toArray();
		var count = 0;
		var zero = '0';
		var td_ = this.prefix;
		
		this.clearKeys();
		
		$.each(listing, function() {
			count++;
			var value = this.innerHTML;
			var $this = $(this);
			var key = td_ + value;
			var newValue; 
			var newPrefix,
				theNewVal;
			
			if (count <= 9) {
				newPrefix = td_ + zero + count;
			} else {
				newPrefix = td_ + count;
			}

			theNewVal = newPrefix + value;
			
			if ($this.hasClass('completed')) {	//do not set items that are set to completede
				count--;
			} else {
				newValue = localStorage.setItem(theNewVal, theNewVal);
			}
		})
	},
	
	//TODO iterate over localStorage and pull out the prefix keys of 'td_'
	clearKeys : function() {
		localStorage.clear();
	}
};

//dynamic thingys
$(document).ready(function() {
	$('#itemsToDo').sortable({ cancel: '.completed',
		beforeStop: function(event, ui) {
			TD.reNameKeys();
		}
	});	
	
	$('#toDoItem').droppable({
		drop: function(event, ui) {
			var uiContent = ui.draggable,
				$this = $(this),
				toDoItem = uiContent.text();
			
			$this.val(toDoItem);		//set the value of the input to the text of item dragged into it
			TD.removeStorage(toDoItem);	//remove that item's value from local storage
			$(uiContent.remove());		//remove that item from the Dom
		}
	});
});

// Build all of the remaining to Dos from Local Storage	
$(document).ready(function(){
	var storageLength = localStorage.length,
		i, key, prefix, value, index, valuePrefix;
		
	for (i = 0; i < storageLength; i++ ) {
		key = localStorage.key(i),
		prefix = key.slice(0,3),		//slice off the td_ prefix
		value = localStorage[key],
		valuePrefix = value.slice(5); 	//slice of the count
		
		index = $('.itemToDo').length;
		
		if (prefix !== TD.prefix) continue;	//only publish todos with proper prefix
		
		TD.addToDom(valuePrefix);
		console.log(valuePrefix, index);			
	}

});