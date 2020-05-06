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
/*
//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
		{
			$("#hidDoctorIDSave").val($(this).closest("tr").find('td:eq(0)').text());
			$("#fName").val($(this).closest("tr").find('td:eq(1)').text());
			$("#lNmae").val($(this).closest("tr").find('td:eq(2)').text());
			$("#gender").val($(this).closest("tr").find('td:eq(3)').text());
			$("#age").val($(this).closest("tr").find('td:eq(4)').text());
			$("#docNIC").val($(this).closest("tr").find('td:eq(5)').text());
			$("#docEmail").val($(this).closest("tr").find('td:eq(6)').text());
			$("#passwod").val($(this).closest("tr").find('td:eq(7)').text());
			$("#phoneNumber").val($(this).closest("tr").find('td:eq(8)').text());
		});



	
	//Remove
	$(document).on("click", ".btnRemove", function(event)
			{
			 	$.ajax(
			{
				url : "DoctorAPI",
				type : "DELETE",
				data : "D_Id=" + $(this).val(),
				dataType : "text",
				complete : function(response, status)
				{
					onDoctorDeleteComplete(response.responseText, status);
				}
			 });
			});

	
		function onDoctorDeleteComplete(response, status)
		{
			if (status == "success")
		{
				var resultSet = JSON.parse(response);
				if (resultSet.status.trim() == "success")
		{
				$("#alertSuccess").text("Successfully deleted.");
				$("#alertSuccess").show();
				$("#divDoctorGrid").html(resultSet.data);
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
}*/
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
