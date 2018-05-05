
AWS.config.update({region:'us-east-1'});
//AWS.config.region = 'us-east-1'; // Region
			/*AWS.config.credentials = new AWS.CognitoIdentityCredentials({
   			 IdentityPoolId: 'us-east-1:e5fae68c-67c8-47a0-8b40-3a74e4091a48',
			});*/
			//AWS.config.credentials = new AWS.CognitoIdentityCredentials(parameters);
  function callApi(finalInput){
  
  if(finalInput==null)
  {

  
	
 		// set the Amazon Cognito region
  			//var machinelearning = new AWS.MachineLearning({apiVersion: '2014-12-12'});
  			var machinelearning = new AWS.MachineLearning({
//endpoint:'https://realtime.machinelearning.us-east-1.amazonaws.com',//(String)—TheendpointURItosendrequeststo.Thedefaultendpointisbuiltfromtheconfiguredregion.Theendpointshouldbeastringlike'https://{service}.{region}.amazonaws.com'.

    accessKeyId: "AKIAIITX6ZJXMVEBNAWA",//(String)—yourAWSaccesskeyID.
    secretAccessKey: "2Xxo2s7tlScFukhR7HD3ggBtM8ud2XF2+R7DTRqr"//(String)—yourAWSsecretaccesskey.
    //region:'us-east-1'
});
	/*var parameters = {
      AccountId: "ritik_arora",
      RoleArn: "Cognito_readmissionbinmodelAuth_Role",
      IdentityPoolId: "us-east-1:e5fae68c-67c8-47a0-8b40-3a74e4091a48"
       };*/
 				
		var inputparam = "";
		var gender_value="";
		if (document.getElementById('gender_female').checked) {
  			gender_value = document.getElementById('gender_female').value;
		}else if (document.getElementById('gender_male').checked) {
  			gender_value = document.getElementById('gender_male').value;
		}
		if(gender_value != "")
			inputparam = '"gender":'+'"'+gender_value+'"'+","+"\n";
		
		var age_category_value="";
		if (document.getElementById('age_category_adult').checked) {
  			age_category_value = document.getElementById('age_category_adult').value;
		}else if (document.getElementById('age_category_old').checked) {
  			age_category_value = document.getElementById('age_category_old').value;
		}else if (document.getElementById('age_category_young').checked) {
  			age_category_value = document.getElementById('age_category_young').value;
		}
			inputparam = inputparam + '"age_category":'+'"'+age_category_value+'"'+","+"\n";
			inputparam = inputparam + '"race":'+'"'+document.getElementById('Race').value+'"'+","+"\n";
		
			inputparam = inputparam + '"discharge_disposition":'+'"'+document.getElementById('Discharge_Disposition').value+'"'+","+"\n";
		
			inputparam = inputparam + '"admission_source":'+'"'+document.getElementById('Admission_Source').value+'"'+","+"\n";
		
			inputparam = inputparam + '"admission_type":'+'"'+document.getElementById('Admission_Type').value+'"'+","+"\n";
		
			inputparam = inputparam + '"insulin":'+'"'+document.getElementById('Insulin').value+'"'+","+"\n";
		
		var diabetes_value="";
		if (document.getElementById('diabetes_med_yes').checked) {
  			diabetes_value = document.getElementById('diabetes_med_yes').value;
		}else if (document.getElementById('diabetes_med_no').checked) {
  			diabetes_value = document.getElementById('diabetes_med_no').value;
		}
			inputparam = inputparam + '"diabetesmed":'+'"'+diabetes_value+'"'+","+"\n";
			inputparam = inputparam + '"medical_specialty":'+'"'+document.getElementById('Medical_Specialty').value+'"'+","+"\n";
			
			inputparam = inputparam + '"payer_code":'+'"'+document.getElementById('Payer_Code').value+'"'+","+"\n";
		
		if(inputparam != "")
			inputparam = inputparam.substring(0,inputparam.length -2) +",";
		
	    var remainingFields = '"'+"weight"+'"'+":"+'""'+","+'"'+"patient_nbr"+'"'+":"+'""'+","+'"'+"age"+'"'+":"+'""'+","+'"'+"encounter_id"+'"'+":"+'""'+","+'"'+"time_in_hospital"+'"'+":"+'""'+","+'"'+"num_lab_procedures"+'"'+":"+'""'+","+'"'+"num_procedures"+'"'+":"+'""'+","+'"'+"num_medications"+'"'+":"+'""'+","+'"'+"number_outpatient"+'"'+":"+'""'+","+'"'+"number_emergency"+'"'+":"+'""'+","+'"'+"number_inpatient"+'"'+":"+'""'+","+'"'+"diag_1"+'"'+":"+'""'+","+'"'+"diag_2"+'"'+":"+'""'+","+'"'+"diag_3"+'"'+":"+'""'+","+'"'+"number_diagnoses"+'"'+":"+'""'+","+'"'+"max_glu_serum"+'"'+":"+'""'+","+'"'+"a1cresult"+'"'+":"+'""'+","+'"'+"metformin"+'"'+":"+'""'+","+'"'+"repaglinide"+'"'+":"+'""'+","+'"'+"nateglinide"+'"'+":"+'""'+","+'"'+"chlorpropamide"+'"'+":"+'""'+","+'"'+"glimepiride"+'"'+":"+'""'+","+'"'+"acetohexamide"+'"'+":"+'""'+","+'"'+"glipizide"+'"'+":"+'""'+","+'"'+"glyburide"+'"'+":"+'""'+","+'"'+"tolbutamide"+'"'+":"+'""'+","+'"'+"pioglitazone"+'"'+":"+'""'+","+'"'+"rosiglitazone"+'"'+":"+'""'+","+'"'+"acarbose"+'"'+":"+'""'+","+'"'+"miglitol"+'"'+":"+'""'+","+'"'+"troglitazone"+'"'+":"+'""'+","+'"'+"tolazamide"+'"'+":"+'""'+","+'"'+"examide"+'"'+":"+'""'+","+'"'+"citoglipton"+'"'+":"+'""'+","+'"'+"glyburide_metformin"+'"'+":"+'""'+","+'"'+"glipizide_metformin"+'"'+":"+'""'+","+'"'+"glimepiride_pioglitazone"+'"'+":"+'""'+","+'"'+"metformin_rosiglitazone"+'"'+":"+'""'+","+'"'+"metformin_pioglitazone"+'"'+":"+'""'+","+'"'+"change"+'"'+":"+'""'+","+'"'+"readmission_result1"+'"'+":"+'""';
		

		 finalInput = "{"+ inputparam + remainingFields +"}";
	}


		var obj = eval("(" + finalInput + ')');
		var params = {
	 	 	MLModelId: 'ml-2BSwrAYL2SX',
	  		PredictEndpoint: 'https://realtime.machinelearning.us-east-1.amazonaws.com',
	  		Record: obj
		};
		var request = machinelearning.predict(params);
		request.on('success', function(resp) {
			//console.log("resp.data =>"+resp.data+"\n Response object =>"+resp)
			console.log("Predicted Result:"+resp.data.Prediction)
	  		if(resp.data && resp.data){
	  			if(resp.data.Prediction && resp.data.Prediction.predictedScores){
	  				formatResult(resp.data.Prediction);
	  			}
	  		}
		});
		request.on('error',function(resp){console.log(resp)});
		alert('Breakpoint1')
		request.send();
	}
	
	function formatResult(predictedScoresResult){
		var predictedScore = JSON.stringify(predictedScoresResult.predictedScores[predictedScoresResult.predictedLabel]);
		var finalScore, resultMessage;
		
		if(!isNaN(predictedScore)){
			finalScore = Math.round(predictedScore * 100);
			resultMessage = finalScore + "%";
		}
		document.getElementById("id04").style.display = "";
		document.getElementById("id03").style.display = "";
		document.getElementById("id03").innerHTML = resultMessage;	
		if(finalScore<40)
			document.getElementById("id03").style.color = "#228b22";
		else if(finalScore>40 && finalScore<60)
			document.getElementById("id03").style.color = "#ffe63b";	
		else if(finalScore>60)
			document.getElementById("id03").style.color = "#ff0000";		
	}
	
	function refresh(){
		document.getElementById('gender_female').checked = false;
		document.getElementById('gender_male').checked = false;
		document.getElementById('age_category_adult').checked = false;
		document.getElementById('age_category_old').checked = false;
		document.getElementById('age_category_young').checked = false;
		document.getElementById("Race").value = "";
		document.getElementById('Discharge_Disposition').value = "";
		document.getElementById('Admission_Source').value = "";
		document.getElementById('Admission_Type').value = "";
		document.getElementById('Insulin').value = "";
		document.getElementById('diabetes_med_yes').checked = false;
		document.getElementById('diabetes_med_no').checked = false;
		document.getElementById('Medical_Specialty').value = "";
		document.getElementById('Payer_Code').value = "";
		document.getElementById("id04").style.display = "none";
		document.getElementById("id03").style.display = "none";
	}

