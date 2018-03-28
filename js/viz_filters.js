function businesscode(results)
{
	// Method 1
	//ajaxresponse = JSON.stringify(response);
	htmlcode="<table>";
	$.each(results, function() {
		htmlcode+="<tr>";
  $.each(this, function(k, v) {
    /// do stuff
    htmlcode+="<td>";
    htmlcode+="key "+k+" value: "+v+"</td>";
    localStorage.setItem(k, v);
  })
  htmlcode+="</tr>";
  
});
htmlcode+="</table>";
console.log(htmlcode);
$("#testtable").html(htmlcode);
var newWindow = window.open();
newWindow.document.write(htmlcode);



	//Method 2
	/*Object.keys(result).forEach(function(key) {
		
      var row = result[key];
      
      console.log(row.name)
  });*/
}
function getAdmissions()
{
	var date1=$("#filterdate1").val();
	var date2=$("#filterdate2").val();
	console.log("dates are"+date1+"\n"+date2);

	//call database to get records into ajaxresponse
	

	var ajaxresponse=[
		["row1","value1"],
		["row2","value2"]
	];
	businesscode(ajaxresponse);
	
			
}
//$("#view_patients").addEventListener('click',function(){alert('asdasd');})
