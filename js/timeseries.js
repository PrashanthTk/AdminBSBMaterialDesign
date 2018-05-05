
var dat2;
var dat3;


function getData()
{
    const chart = new Chart(tsctx, options);
}
function preprocess(data)
{
    dat2 = $.csv.toArrays(data);
    resstr='';
    tuple=[]
    code="<Br>{}"
    /*var i=1;
    flag=0
    for (var row in dat3)
    {
      if((i+=1)>4)
          {
            flag=2;
            break;
          }
      for (var item in dat3[row])
      {
        
        //  if(flag==2)break;
      console.log("bitches get stitches\n<br>")//tuple=str(dat2[ind]).split()
      }
      //for (var col in dat2[row]);
      //code=code+dat2[row][col]+"<br>{}"
    } 
    elem=dat2[1].toString()
    elem=elem.split('')
    console.log("Check"+elem[0][1])*/
    //================
    empty = "";
    html = "<table>";
    counter=0
    xvalues=[]
    yvalues=[]
    for(i = 0; i < dat2.length; i++){
        html += "<tr>";
        if(i==0)continue;
        counter=0;
        for(j = 0; j < dat2[i].length; j++){
            if(counter==0)
              xvalues.push(dat2[i][j]);
            if(counter==1)
              yvalues.push(dat2[i][j])
            html +="<td>"+dat2[i][j]+"</td>";

            if(dat2[i][j].trim() == ""){
                empty += "cell "+i+" "+j+" is empty";
                empty += "<br />";
            }
            counter=counter+1;
        }
      
        html += "</tr>";
    }
    //============================
    tuple=dat2[0].toString().split(" ")
    drawchart(xvalues,yvalues);
    console.log(xvalues[0]+"$ "+xvalues[1]+"$"+xvalues[2])
    /*$('#map').html(        'Length of dat2 is ' + dat2.length + '<br>' +
        'Length of dat3 is ' + dat3.length + '<br>' +
        'Is dat0 equal to dat2: ' + _.isEqual(dat0, dat2)+ '<br>' +
        'Is dat1 equal to dat3: ' + _.isEqual(dat1, dat3)+'\n dat2 xvalues <br>'+html+"<br>end")*/

const tsctx = document.getElementById('time_series_chart').getContext('2d');


const tsdata = {
    // Labels should be Date objects
    //labels: [new Date(2017, 08, 16), new Date(2017, 08, 17), new Date(2017, 08, 18)],
    labels: xvalues,
    datasets: [{
        fill: false,
        label: 'Readmissions',
        //data: [280, 250, 340],
        data:yvalues,
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



}

$(document).ready(function() {
$.ajax({
    type: "GET",
    url: "/ReadmissionAnalyzer/tes/testdat.csv",
    dataType: "text",
    success: function(data) {
        //console.log(data.text) ;
        
         preprocess(data)
    },
    error:function(err){console.log(err)},
});



// array of objects
$.ajax({
    type: "GET",
    url: "./tes/testdata.csv",
    dataType: "text",
    success: function(data) { dat3 = $.csv.toObjects(data);
           }
});

});



//}); // end document ready





