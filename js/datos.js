/*Lina Vanessa Vera Pulido - 1151998 - 14/04/2020 */


function vPeriod(lim) {
  return lim == 5 || lim > 6 || lim < 1;
}
var meses=[],venta=[];
function period(lim) {
  var p = "";
  if (lim == 1) {
    p = "Mensual";
  } else if (lim == 2) {
    p = "Bimestre";
  } else if (lim == 3) {
    p = "Trimestre";
  } else if (lim == 4) {
    p = "Cuatrimestre";
  } else if (lim == 6) {
    p = "Semestral";
  } else {
    p = "no valido";
  }
  return p;
}

function nPeriods(lim) {
  var np=0;
  if (lim == 1) {
    np = 12;
  } else if (lim == 2) {
    np = 6;
  } else if (lim == 3) {
    np = 4;
  } else if (lim == 4) {
    np = 3;
  } else if (lim == 6) {
    np = 2;
  } else {
    np = 0;
  }
  return np;
}

function ventas(){
    var ventas= document.getElementsByName("venta");
    var g=[];
    for(i=0; i<ventas.length; i++)
    {
        g[i]= parseInt(ventas[i].value,10)  ;
    }
   return g;
}

function createTable() {
  var lim = document.getElementById("periodo").value;
  var año =  document.getElementById("año").value;
  var graf= document.getElementById("tableFuntion");
  var suma=0, j=0;
  var t ="";
 // var meses=[], venta=[];

  if (vPeriod(lim)) {
    alert("Periodo no valido");
  } 
  else {
      var p= period(lim);
      var f =  ventas();
      var np=nPeriods(lim);
    t = "<table> <tr> <th colspan='2'>Información de ventas año: " + año + "</th> </tr>";
    t += "<tr> <th>" + p + "</th>";
    t += "<th>Valor</th></tr>";
    var pww=1;
    meses=[np-1], venta=[np-1];
      for(i=0; i< f.length; i++){
          suma = suma + f[i];
          j++;
          if(lim==j){
            j=0;
            t += "<tr>";
            t += "<td id='mess' name='mess'>" + pww+ "</td>";
            t += "<td id='ventaA' name='ventaA'>"+ suma +"</td>";
            t += "</tr>";
            meses[pww-1]=pww.toString();
            venta[pww-1]=suma.toString();
           
            pww++;
            suma=0;
          }   
          
      }
     
      console.log(meses);
      console.log(venta);
  
      t+="</table>";
    //  t+="<a href='#graficoA'><button type='button' class='btn btn-primary' onclick='crearGrafico()'>Crear grafico</button></a>";
      graf.innerHTML=t; 
      drawChart(meses,venta);
    }
    
}


function draw() { 
    drawChart(57);
    google.charts.setOnLoadCallback(drawChart);
}

/*
function draw_chart(mesesA, ventaA)
{
    drawChart(mesesA, ventaA);
    //drawTable(meses, venta);
    google.charts.setOnLoadCallback(drawChart);
  //  google.charts.setOnLoadCallback(drawTable);
    
}*/
function drawChart(a, v) {
  var data = new google.visualization.DataTable();
  alert("Se va a crear un gráfico con " + a.length + " Items");
  data.addColumn("string", "Name");
  data.addColumn("number", "Ventas");
  data.addRows(a.length);
  for (i = 0; i < a.length; i++) {
    data.setCell(i, 0, a[i]);
    data.setCell(i, 1, v[i]);
  }
  var options = {
  title: 'Análisis de ventas',
  chartArea: {width: '25%'},
  hAxis: {
    title: 'Ventas',
    minValue: 0
  },
  vAxis: {
    title: 'Meses'
  }
};
  var chart = new google.visualization.BarChart(document.getElementById('piechart_3d'));
  chart.draw(data, options);
}


