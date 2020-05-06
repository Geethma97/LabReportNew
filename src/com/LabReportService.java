package com;

import model.LabReport;

import java.sql.Date;

//For REST Service 
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

//For JSON 
import com.google.gson.*;

//For XML 
import org.jsoup.*;
import org.jsoup.parser.*;
import org.jsoup.nodes.Document;

@Path("/LabReport")
public class LabReportService {
	LabReport LabReportObj = new LabReport();

	
	
	
	@GET
	@Path("/ViewLabDetailsbyLabID")
	@Produces(MediaType.TEXT_HTML)
	public String ViewLabDetailsbyLabID() {
		return LabReportObj.ViewLabDetailsbyLabID();
	}
	
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.TEXT_PLAIN)
	public String AddLabDetails(@FormParam("type") String type,
								@FormParam("Description") String Description,
								@FormParam("date") Date date)
	{
		String output = LabReportObj.AddLabDetails(type, Description, date);
		return output;
	}
	
	
	


	
	@PUT
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String updateLab(String labData) {

		JsonObject labObject = new JsonParser().parse(labData).getAsJsonObject();

		String LabID = labObject.get("LabID").getAsString();
		String type = labObject.get("type").getAsString();
		String Description = labObject.get("Description").getAsString();
		String date = labObject.get("date").getAsString();

		
		

		String output = LabReportObj.Updatelab(LabID, type, Description, date);
		return output;
	}
	
	
	@DELETE 
	@Path("/") 
	@Consumes(MediaType.APPLICATION_XML) 
	@Produces(MediaType.TEXT_PLAIN) 
	public String RemoveLab(String LabData) 
	
	{  
		//Convert the input string to an XML document  
		Document doc = Jsoup.parse(LabData, "", Parser.xmlParser());     
		
		//Read the value from the element <Lab_Id>  
		String LabID = doc.select("LabID").text(); 
	
		 
		 String output = LabReportObj.RemoveLab(LabID);
		 
		 return output;
	} 

	
}