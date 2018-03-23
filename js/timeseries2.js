var dat2;
var dat3;
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


function drawchart(x,y)
{
    alert("NCSV Changed")
const tsctx = document.getElementById('time_series_chart').getContext('2d');
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
    type: 'bar',
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
function getData()
{
    $.ajax({
    type: "GET",
    url: "/ReadmissionAnalyzer/tes/testdata.csv",
    dataType: "text",
    success: function(data) {
        dat2 = $.csv.toArrays(data);
        coords=handledata(dat2);
        drawchart(coords[0],coords[1]);
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
}