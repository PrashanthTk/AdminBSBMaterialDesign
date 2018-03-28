var dat2;
var dat3;
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function handledata(dat2)
{
    //xvalues=[0,1,2,3];
    //yvalues=[5,2,2,6];
    
    xvalues=[];
    yvalues=[];
        for(i = 0; i < dat2.length; i++){
        //html += "<tr>";
        if(i==0)continue;
        counter=0;
        for(j = 0; j < dat2[i].length; j++){
            if(counter==0)
              xvalues.push(dat2[i][j]);
            if(counter==1)
              yvalues.push(dat2[i][j])
            //html +="<td>"+dat2[i][j]+"</td>";

            if(dat2[i][j].trim() == ""){
                //empty += "cell "+i+" "+j+" is empty";
                //empty += "<br />";
            }
            counter=counter+1;
        }
      
        //html += "</tr>";
    }
    return [xvalues,yvalues];
}


function drawtimechart(x,y)
{
    //alert("NCSV Changed")
const tsctx = document.getElementById('chart2').getContext('2d');
const tsdata = {
    // Labels should be Date objects
    //labels: [new Date(2017, 08, 16), new Date(2017, 08, 17), new Date(2017, 08, 18)],
    labels:x,
    datasets: [{
        fill: false,
        label: 'Readmissions',
        //data: [280, 250, 340],
        data:y,
        borderColor: '#fe8b36',
        backgroundColor: '#fe8b36',
        lineTension: 0,
    }]
}
const options = {
    type: 'line',
    data: tsdata,
    options: {
        fill: false,
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Date",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Readmissions",
                }
            }]
        }
    }
}
const chart = new Chart(tsctx, options);

}
function convert_time_adm_age(results,start_year,end_year)
{
    var years={};
    year=parseInt(start_year);
    end_year=parseInt(end_year);
    while (year<=end_year)
    {
        
        years[String(year)]=[0,0,0,0,0,0,0,0,0,0];
        year+=1;
    }
        var ages=['[0-10)',
    '[10-20)',
    '[20-30)',
    '[30-40)',
    '[40-50)',
    '[50-60)',
    '[60-70)',
    '[70-80)',
    '[80-90)',
    '[90-100)'];
    results=results['diabetes_data']; 

    for (var enc in results)
    {
        encounter=results[enc];
        p_age=encounter.age;
        date=new Date(new String(encounter.admission_date));
        newdate=date.getFullYear();
        
        //alert("stopper")
        years[newdate][ages.indexOf(p_age)]+=1
        
    }
    console.log(years['1999'])
    return [ages,years]
      
}
function convert_time_adm_gender(results)
{
    var time_admissions={};
    var males={};
    var females={};
    var femtime={};
    var mtime={};
    //var num_encounters=[];
    results=results['diabetes_data'];
    //console.log(results['diabetes_data'].length)
    for(var enc in results)
    {
        //date=encounter.admission_date.split("/");
        encounter=results[enc];
        //console.log(encounter.admission_date);
        date=new Date(new String(encounter.admission_date));
        newdate=date.getFullYear();
        females[newdate]=0;
        males[newdate]=0;
        time_admissions[newdate]=0;

    }
    for(var enc in results)
    {
        //date=encounter.admission_date.split("/");
        encounter=results[enc];
        //console.log(encounter.admission_date);
        date=new Date(new String(encounter.admission_date));
        newdate=date.getFullYear();
        
        /*if (newdate in time_admissions )
        {*/
            if(encounter.gender=="Female")
            {
                females[newdate]+=1;
            }
                
            if(encounter.gender=="Male")males[newdate]+=1;
        //}
        //else
        //{

        //}
        
            
    }
    console.log(Object.keys(time_admissions).length)
    return [time_admissions,females,males];

}
function drawchart1(data)
{
    var x=[];
        var mal_adms=[];
        var fem_adms=[];
        //console.log("data is \n"+data)
        coords=convert_time_adm_gender(data);
        //console.log(coords['2002'])
        var times=Object.keys(coords[0]);
        var males=coords[2];
        var females=coords[1];
        for (var t in times)
        {
            //x.push(times[t]);
            //console.log("X is=>"+t+"\t Y=>"+coords[t]);
            mal_adms.push(males[times[t]]);
            fem_adms.push(females[times[t]])
        }

        drawtime_adm_genderchart(times,mal_adms,fem_adms);
}
function drawchart2(data)
{
    coords=convert_time_adm_age(data,'1999','2003');
    var ages=coords[0];
    var year_mat=coords[1];
    var datasets=[];
    years=Object.keys(year_mat)
    for (y in years)
    {
        year=years[y];
        color=getRandomColor();
        datasets.push({
        fill: false,
        label: year,
        //data: [280, 250, 340],
        data:year_mat[year],
        borderColor: color,
        backgroundColor: color,
        lineTension: 0,
    });
    }
    //alert("stopper5")

    drawage_time(ages,datasets)

    //years contains an array for each year between start and end date. 
    //And each of these arrays is a 10 dim vector for age categories denoting the frequency of admissions for each admission in that year in that age category..
}

function drawage_time(age_categories,yvalues)
{
    const tsctx = document.getElementById('chart1').getContext('2d');
    const tsdata = {
    labels:age_categories,
    datasets: yvalues,
                    }
const options = {
    type: 'bar',
    data: tsdata,
    options: {
        fill: false,
        responsive: true,
        scales: {
            xAxes: [{
                //type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Year",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Readmissions of  different genders over time",
                }
            }]
        }
    }
}
const age_chart = new Chart(tsctx, options);


}
function drawtime_adm_genderchart(times,males,females)
{
    const tsctx = document.getElementById('chart2').getContext('2d');
    const tsdata = {
    // Labels should be Date objects
    //labels: [new Date(2017, 08, 16), new Date(2017, 08, 17), new Date(2017, 08, 18)],
    labels:times,
    datasets: [{
        fill: false,
        label: 'Male Admissions',
        //data: [280, 250, 340],
        data:males,
        borderColor: '#fe8b36',
        backgroundColor: '#fe8b36',
        lineTension: 0,
    },
    {
        fill: false,
        label: 'Female Admissions',
        //data: [280, 250, 340],
        data:females,
        borderColor: '#212bb2',
        backgroundColor: '#212bb2',
        lineTension: 0,
    }]
}
const options = {
    type: 'line',
    data: tsdata,
    options: {
        fill: false,
        responsive: true,
        scales: {
            xAxes: [{
                //type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Year",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Readmissions of  different genders over time",
                }
            }]
        }
    }
}
const gender_chart = new Chart(tsctx, options);

}
function demo_dataplotter()
{
    var dates={
        startdate:$("#filterdate1").val(),
        enddate:$("#filterdate2").val()
    };
    //alert(dates.startdate);
    // /console.log(dates.enddate);
    $.ajax({
    type: "GET",
    url: "./js/demo_data.json",
    dataType: "json",
    data:dates,
    success: function(data) {
        //dat2 = $.csv.toArrays(data);
        //coords=handledata(dat2);
        drawchart1(data);
        drawchart2(data);
    },
    error: function(err){
        console.log(err);
    },});
}

/*function getData()
{
    $.ajax({
    type: "GET",
    url: "/ReadmissionAnalyzer/tes/testdata.csv",
    dataType: "text",
    success: function(data) {
        dat2 = $.csv.toArrays(data);
        coords=handledata(dat2);
        //coords=convert_time_admissions(coords);
        drawtimechart(coords[0],coords[1]);
    },
    error: function(err){
        console.log(err);
    },});
}

function tryutton()
{
    alert("I am here")
const tsctx = document.getElementById('time_series_chart').getContext('2d');
const tsdata = {
    // Labels should be Date objects
    labels: [new Date(2017, 08, 16), new Date(2017, 08, 17), new Date(2017, 08, 18)],
    datasets: [{
        fill: false,
        label: 'Readmissions',
        data: [280, 250, 340],
        borderColor: '#fe8b36',
        backgroundColor: '#fe8b36',
        lineTension: 0,
    }]
}
const options = {
    type: 'line',
    data: tsdata,
    options: {
        fill: false,
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Date",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Readmissions",
                }
            }]
        }
    }
}
const chart = new Chart(tsctx, options);
}*/