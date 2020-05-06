/**
 * 
 */

$(document).ready(function() {
	$("#alertSuccess").hide();
	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {

	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateLabForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	var type = ($("#hidLabIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "LabAPI",
		type : type,
		data : $("#LabReport").serialize(),
		dataType : "text",
		complete : function(response, status) {
			console.log(response)
			onLabSaveComplete(response.responseText, status);
		}
	});
});
//save 
function onLabSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divLabGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidLabIDSave").val("");
	$("#LabID")[0].reset();
}

//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
		{
			$("#hidLabIDSave").val($(this).closest("tr").find('td:eq(0)').text());
			$("#type").val($(this).closest("tr").find('td:eq(1)').text());
			$("#Description").val($(this).closest("tr").find('td:eq(2)').text());
			$("#date").val($(this).closest("tr").find('td:eq(3)').text());
			
		});



	
	//Remove
	$(document).on("click", ".btnRemove", function(event)
			{
			 	$.ajax(
			{
				url : "LabAPI",
				type : "DELETE",
				data : "LabID=" + $(this).val(),
				dataType : "text",
				complete : function(response, status)
				{
					onLabDeleteComplete(response.responseText, status);
				}
			 });
			});

	
		function onLabDeleteComplete(response, status)
		{
			if (status == "success")
		{
				var resultSet = JSON.parse(response);
				if (resultSet.status.trim() == "success")
		{
				$("#alertSuccess").text("Successfully deleted.");
				$("#alertSuccess").show();
				$("#divLabGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
				$("#alertError").text(resultSet.data);
				$("#alertError").show();
		}
		}
		else if (status == "error")
		{
			$("#alertError").text("Error while deleting.");
			$("#alertError").show();
		} 
		else
		{
			$("#alertError").text("Unknown error while deleting..");
			$("#alertError").show();
		}
}
		// CLIENT-MODEL================================================================
		function validateLabForm() {
			// Type
			if ($("#type").val().trim() == "") {
				return "Insert Type";
			}

			// Description
			if ($("#Description").val().trim() == "") {
				return "Insert Description";
			}
			// Date
			if ($("#date").val().trim() == 0 ) {
				return "Insert Date.";
			}
		
			return true;
		}
