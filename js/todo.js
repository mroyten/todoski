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
		TD.reNameKeys();
		$this.val(''); 
	}
});

//toggle the item as completed
$(document).on( 'click', '.itemToDo', function(e) {
	e.preventDefault();
	var $target = $(e.target);
	$target.toggleClass('completed');	
	TD.reNameKeys();
});

$('#itemsToDo').sortable({ 
	cancel: '.completed',
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
		$(uiContent.remove());		//remove that item from the Dom
		TD.reNameKeys();
	}
});
	