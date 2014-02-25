//add items to to do list and to local storage upon inserting them into the text field
$(document).on('keypress', '#toDoItem', function(e) {
	if (e.which === 13) {	// if user hits enter
		var $this = $(this),
			$toDoValue = $this.val();
			
		if (!$toDoValue) {	// check to see if nada is in the form to be entered.
			alert($.messages.emptyToDo);
			return;
		}
		
		TD.addToDom($toDoValue);		//add To Do to Da list
		TD.addStorage($toDoValue);		// add items to the storage
		$this.val(''); 
	}
});

//toggle the item as completed
$(document).on( 'click', '.itemToDo', function(e) {
	e.preventDefault();
	var $target = $(e.target),
		$toDoValue = $target.text();
		
	var $this = $(this).index() + 1;
	
	if ($this <= 9) {
		$this = '0' + $this;
	}
		
	if ($target.hasClass('completed')) {
		TD.addStorage($toDoValue, $this);		
	} else {
		TD.removeStorage($toDoValue, $this);
	}
	
	$target.toggleClass('completed');
});

