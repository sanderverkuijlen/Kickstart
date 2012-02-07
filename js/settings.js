
var settings = loadSettings();

$(document).ready(function(){

	//Make "Escape" close dialogs
	$(window).bind('keyup', function(e){
		if(e.charCode == 0){
			$('.dialog_overlay').hide();
		}
	});


	//Save "Column Layout" setting on click
	$('#settings_col_layouts li').click(function(){

		var name	= $(this).data('name');
		var value	= $(this).data('value');

		//Save the changed setting
		changeSetting(name, value);

		//Select the correct setting in the dialog
		setSelectedSettingsInDialog();

		var new_columns = getNumberOfColumnsInLayout(settings[name]);

		//TODO: Set colnr to 'new_columns-1' for all widgets that have a col_nr => new_columns

		//Redraw the columns and widgets
		createColumns();
		createWidgets();
	});

	//Select current settings in settings_dialog
	setSelectedSettingsInDialog();
});

function loadSettings(){

	var settings = {};
	var defaults = {
		column_layout:	4
	};

	//Settings ophalen als die er al zijn
	try{
		if(typeof localStorage['settings'] !== 'undefined'){
			var settings = JSON.parse(localStorage['settings']);
		}
	}
	catch(e){
	}

	return $.extend(defaults, settings);
}

function changeSetting(key, val){

	//Lokaal wijzigen
	settings[key] = val;

	//Localstorage wijzigen
	localStorage['settings'] = JSON.stringify(settings);
}

function getNumberOfColumnsInLayout(layout){

	switch(layout){

		case 4:
			return 4;
			break;
		case 2:
			return 2;
			break;

		//All other layouts have 3 columns
		default:
			return 3;
			break;
	}
}

function setSelectedSettingsInDialog(){

	//Set the 'Column Layout' setting
	$('#settings_col_layouts li').removeClass('sel').filter('[data-value='+settings['column_layout']+']').addClass('sel');
}