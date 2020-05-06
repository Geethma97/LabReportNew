<%@page import="model.LabReport"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Lab Report</title>
<link href="Views/css/bootstrap.min.css" rel="stylesheet">
<link href="Views/css/style.css" rel="stylesheet">
<script src="Components/jquery-3.5.0.min.js"></script>
<script src="Components/Lab.js"></script>

</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Lab Report</h1>
				<form id="LabReport" name="LabReport">
					Type: <input
						id="type" name="type" type="text"
						class="form-control form-control-sm"> <br>
					Description: <input
						id="Description" name="Description" type="text"
						class="form-control form-control-sm"> <br> 
					Date: <input id="date" name="date" type="text"
						class="form-control form-control-sm"> <br> 
						
						<input id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> 
						<input type="hidden"id="hidLabIDSave" name="hidLabIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divLabGrid">
					<%
						LabReport LabReportObj = new LabReport();
					out.print(LabReportObj.ViewLabDetailsbyLabID());
					%>
				</div>
				
			</div>
		</div>
	</div>

</body>
</html>