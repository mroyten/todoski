module('todoskiTests');

	test( "TD.prefix is 'td_', this is the prefix for the localStorage keys for items 'todo'", 2, function() {
		equal( TD.prefix,'td_', "TD.prefix is a string of 'td_'" );
		notEqual(TD.prefix,'hi_', "TD.prefix is indeed chasing 'td_'")
	});
	
	test( "TD.digit function - make sure a two digit string number is returned", 3, function() {	
		equal( TD.digit(9), '09', "returns number of argument plus zero in string format" );
		equal( TD.digit(12), '12', "returns number of argument greater than 9 in string format" );
		notStrictEqual( TD.digit(12), 12, "doesn't return the number format of number argument" );
	});
		
	test("TD.clearKeys function tests - verify that the localStorage is cleared", 2, function() {
		
		function setUpC() {
			localStorage.clear();
			localStorage.hi = 'hi';
		};
		
		setUpC();
		
		deepEqual( localStorage.length, 1, "returns correct localStorage length" );
		TD.clearKeys();
		deepEqual( localStorage.length, 0, "returns correct localStorage length, after clearing storage" );
	});
		
	test(" TD.index function - verifying that a unique index is created for each list item localStorage key", 3, function() {
		//set up to list items for testing
		$('#qunit-fixture').append($('<li class="itemToDo">hi</li><li class="itemToDo">hi</li>'));
		
		equal($('.itemToDo').length, 2, 'These should be equal');
		
		deepEqual(TD.index(),'02', 'make sure the TD.index() returns a string number');
		notDeepEqual(TD.index(),02, 'make sure that TD.index() does not return a number primative');
	});
	
	test("TD.storageValues function tests", 4, function() {
		
		function setUp() {
			localStorage.clear();
			localStorage.howDeDo = 'testing sample';
			localStorage.td_01heyThere = 'td_01heyThere';
			localStorage.td_02heyTherexxxx = 'td_02heyTherexxxx';
		};
		setUp();
		
		//set up array to store values that will be put into local Storage and have prefix 'td_'
		var localStorageValues = [];
		
		function duplicateStorage(text) {
			localStorageValues.push(text);
		};
		
		TD.storageValues(duplicateStorage);
		
		deepEqual(localStorage.length, 3, "verifying that there are two todoski items from local storage");
		
		deepEqual(localStorageValues[0],'heyThere', 'checking first localStorage item');
		deepEqual(localStorageValues[1],'heyTherexxxx', 'checking second localStorage item');
		deepEqual(localStorageValues[3], undefined, 'make sure localStorageValues is undefined at index 3');
		

		T.tearDown();
	});

	test('TD.addToDom function - test adding list items to DOM correctly', 3, function() {

		T.applyToDos();
		
		deepEqual($('.itemToDo')[0].innerHTML, 'mow the lawn', 'Verify the first list item is there as expected');
		deepEqual($('.itemToDo').length, 2, 'check length of todos');
		notEqual($('.itemToDo').length, 3, 'check that length is right on');
		
		T.tearDown();
	});
	
		//Testing assistant methods
	var T = {
		applyToDos : function () {
			TD.addToDom('mow the lawn');
			TD.addToDom('build fishing app');
		},
		
		tearDown : function() {
			localStorage.clear();
		}
	};
	
	test('TD.renameKeys function - testing items that are added "to do" are added to localStorage ', 5, function() {
		//add a couple items to do
		$('#itemsToDo').append($('<li class="itemToDo">hiThere</li><li class="itemToDo">hiThereBoy</li>'));
		
		//add completed item
		$('#itemsToDo').append($('<li class="itemToDo completed">hi</li>'));
		
		TD.reNameKeys();
		
		deepEqual($('.itemToDo').length,3, 'checking the DOM length of list items');
		deepEqual($('.itemToDo').not('.completed').length,2, 'checking the DOM length of not completed list items ');
		
		deepEqual(localStorage.length,2,'verify localStorage length reflects correctly');
		deepEqual(localStorage['td_01hiThere'], 'td_01hiThere', 'Checking localStorage value');
		deepEqual(localStorage['td_02hiThereBoy'], 'td_02hiThereBoy', 'Checking localStorage value on next item');
		
		T.tearDown();
	});
	

