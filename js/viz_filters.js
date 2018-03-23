function getAdmissions()
{
	var date1=$("#filterdate1").val();
	var date2=$("#filterdate2").val();
	console.log(date1+"\n"+date2);

	//call database to get records into ajaxresponse
	htmlcode="<table>";

	var ajaxresponse={
		"row1":"	"
	}
	businesscode(ajaxresponse,htmlcode);
	
			
}
function businesscode(ajaxresponse,htmlcode)
{
	// Method 1
	//ajaxresponse = JSON.stringify(response);
	/*$.each(ajaxdata, function() {
		htmlcode+="<tr>";
  $.each(this, function(k, v) {
    /// do stuff
    html+=row+"</td>";
    localStorage.setItem(k, v);
  })
  htmlcode+="</tr>";
  
});
html+="</table>";
var newWindow = window.open();
newWindow.document.write(html);
*/


	//Method 2
	/*Object.keys(result).forEach(function(key) {
		
      var row = result[key];
      
      console.log(row.name)
  });*/
}