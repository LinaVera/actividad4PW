/*Lina Vanessa Vera Pulido - 1151998 - 14/04/2020 */
var mesesT=[],ventaT=[];

function vPeriod(lim) {
  return lim == 5 || lim > 6 || lim < 1;
}

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
//Formulario de ventas
function createTableM(){
  var ta= document.getElementById("tableMouths");
  var t="";
  t = "<table class='table table-striped table-hover table-bordered'> <tr> <th>Mes</th> ";
  t += "<th>Valor de la venta en COP</th> </tr>";
  for(i=1; i<= 12; i++){
    t += "<tr>";
    t += "<td >"+i+"</td>";
    t += "<td ><input type='number' name='venta'></td>";
    t += "</tr>";

  }
  t+="</table>";
  t+="<a href='#graficoT'></a><button onclick='createTable()' class='btn btn-primary'>Crear tabla</button></a> ";
  ta.innerHTML=t;
}

function ventas(){
    var ventasA= document.getElementsByName("venta");
    var g=[];
    for(i=0; i<ventasA.length; i++)
    {
      if(ventasA[i].value.length===0){
        console.log("Es vacio");
        g[i]= 0;
      }else{
        g[i]= parseFloat(ventasA[i].value) ;
    }
  }
   return g;
}
//Tabla de análisis de las ventas
function createTable() {
  var lim = document.getElementById("periodo").value;
  var año =  document.getElementById("año").value;
  var graf= document.getElementById("tableFuntion");
  var suma=0, j=0;
  var t ="";

  if (vPeriod(lim)|| año.length !=4) {
    alert("Periodo o año no valido");
  } 

  else {
      var p= period(lim);
      var f =  ventas();
      var np=nPeriods(lim);
    t = "<table> <tr> <th colspan='2'>Información de ventas año: " + año + "</th> </tr>";
    t += "<tr> <th>" + p + "</th>";
    t += "<th>Valor</th></tr>";
    var pww=1;
    mesesT=[np-1], ventaT=[np-1];
      for(i=0; i< f.length; i++){
          suma = suma + f[i];
          j++;
          if(lim==j){
            j=0;
            t += "<tr>";
            t += "<td >" + pww+ "</td>";
            t += "<td >"+ suma +"</td>";
            t += "</tr>";
            mesesT[pww-1]=pww.toString();
            ventaT[pww-1]=suma.toString();
            pww++;
            suma=0;
          }      
      }
     
      console.log(mesesT);
      console.log(ventaT);
    
      t+="</table>";
      
      graf.innerHTML=t; 
      drawChart(mesesT,ventaT);
     // drawTable(mesesT,ventaT,p);
      
    }
}
//**************google chart*********************** */
function draw() { 
    drawChart(37);
    google.charts.setOnLoadCallback(drawChart);
}

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
  var chart = new google.visualization.BarChart(document.getElementById('grafica'));
  chart.draw(data, options);
}
/*
function drawTable(a, v,p) {
  var data = new google.visualization.DataTable();

  
  data.addColumn("string");
  data.addColumn("number");
  data.addRows(a.length);
  for (i = 0; i < a.length; i++) {
    data.setCell(i, 0, a[i]);
    data.setCell(i, 1, v[i]);
  }
  var table = new google.visualization.Table(
    document.getElementById("tableFuntion")
  );

  table.draw(data, {
    showRowNumber: false,
  });
}*/