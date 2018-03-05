var temperatur; // ein p5 Table
var temperaturString; // ein p5 String
var tempPunkte = [];

var w = 1; // Breite des Temperatur-Rechtecks
var a = 2; // Abstand zwischen den Temperatur-Rechtecken
var f = 10; // Faktor beim Verstärken des Temperaturwertes
var messProTag = 6; // wieviele Messungen pro Tag werden angezeigt?

function setup() {
  createCanvas(4440, 840);
  background(255);
  textAlign(RIGHT);
  textFont("Roboto"); //bei index.html als Google-Font importiert

  // geht Zeile für Zeile durch die Textdatei "temperatur.txt"
  // und zieht dabei den jeweils 1. Eintrag (hier Temperatur-Werte) in das Array "tempPunkte[]"
  var rowCount = temperatur.getRowCount();
  for (var i = 0; i < rowCount; i++) {
    tempPunkte[i] = temperatur.getNum(i, 0);
  }

  // console.log("Temperatur, 1. Eintrag: " + tempPunkte[0]);
  // console.log("Länge von tempPunkte: " + tempPunkte.length);

  //================ waagrechte Linien und Temperatur-Beschriftungen ================

  // Null-Grad-Linie
  stroke(150);
  line(23,height/2,width-10,height/2);

  // hier Schriftfarbe
  fill(210);

  // Farbe des Gitters (waagrecht und senkrecht)
  stroke(0,20);

  // Minus Linien und Ziffern
  for (var k=0; k <= 40; k++) {
    line(20,height/2+(k*f),width-10,height/2+(k*f));
    // Textangabe nur alle 5 Linien
    // nicht ganz sauber, Ziffern laufen über Canvas hinaus, sieht man aber nicht!
    text((k * -1)*5,18,(height/2+5)+(k*5*f));
  }

  // Plus-Linien und Ziffern
  for (var l=0; l <= 40; l++) {
    line(20,height/2-(l*f),width-10,height/2-(l*f));
    // Textangabe nur alle 5 Linien
    // nicht ganz sauber, Ziffern laufen über Canvas hinaus, sieht man aber nicht!
    text(l*5,18,(height/2+5)-(l*5*f));
  }

  //================ senkrechte Linien und Tage ========================

  var startPunkt = 28; // Anfangs-x-Wert der senkrechten Linie

  // 366 Tage anzeigen
  for (var n=0; n <= 366; n++) {
    line(startPunkt+(n*a*messProTag),10,startPunkt+(n*a*messProTag),height-10);
  }

  // Monatslinien und Monats-Beschriftungen

  // Ende Januar
  var laenge = 31; // brauche ich in der Funktion "monatsLinie" separat!
  var tage = laenge; // tage werden zusammenaddiert, um die Pos. der senkrechten Linien zu berechnen
  monatsLinie(startPunkt,tage,laenge,"Januar");

  // Ende Februar, Schaltjahre beachten!
  // in der Funktion "monatsLinie" auch schon den Fall "29 Tage" berücksichtigt!
  laenge = 28;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"Februar");

  // Ende März
  laenge = 31;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"März");

  // Ende April
  laenge = 30;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"April");

  // Ende Mai
  laenge = 31;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"Mai");

  // Ende Juni
  laenge = 30;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"Juni");

  // Ende Juli
  laenge = 31;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"Juli");

  // Ende August
  laenge = 31;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"August");

  // Ende September
  laenge = 30;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"September");

  // Ende Oktober
  laenge = 31;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"Oktober");

  // Ende November
  laenge = 30;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"November");

  // Ende Dezember
  laenge = 31;
  tage += laenge;
  monatsLinie(startPunkt,tage,laenge,"Dezember");

  //================== Durchschnitt der Temperatur berechnen ================

  // schon hier, weil ich dies für die Anzeige der min- und max-Rechtecke brauche!
  var Summe = 0;
  var Durchschnitt = 0;
  // zuerst alle Einträge zusammenrechnen
  for (var p = 0; p < tempPunkte.length; p++) {
    Summe += tempPunkte[p];
  }
  // Durchschnitt = Summe aller Einträge / Anzahl der Einträge
  // Achtung, ist am Anfang leer, deswegen abfragen, es sollten mind. 2 Einträge drin sein
  if (tempPunkte.length > 1){
    Durchschnitt = Summe/tempPunkte.length;
    // auf 3 Stellen hinter dem Komma beschränken
    Durchschnitt = Durchschnitt.toFixed(3);
  } else {
    Durchschnitt = "noch zu wenig Datensätze!";
  }

  //================ der eigentliche Graph ========================

  noStroke();

  // zur Abfrage der höchsten bzw. niedrigsten Temperaturen
  var tMax = Durchschnitt, tMaxPos;
  var tMin = Durchschnitt, tMinPos;

  for (var j = 0; j < tempPunkte.length; j++) {

    /*
    Ellipsen werden unterschiedlich farbig, je nach Temperatur
    orange = > 25°
    rot = > 0°
    hellblau = <= 0°
    dunkelblau = <= -10°
    */
    if (tempPunkte[j]>=25) {
      fill(218,162,16,180);
    } else if (tempPunkte[j]>0 && tempPunkte[j]<25) {
      fill(255,0,0,110);
    } else if (tempPunkte[j]<=0 && tempPunkte[j]>-10) {
      fill(0,0,255,110);
    } else if (tempPunkte[j]<=-10) {
      fill(7,13,87,160);
    }

    // damit reihen sich die Rechtecke an der 0-Linien auf
    var y = height/2-(tempPunkte[j]*f);
    rect(30+(a*j),y,w,height/2-y);

    // Abfrage des max-Wertes Temperatur
    if (tempPunkte[j] > tMax){
      tMax = tempPunkte[j];
      tMaxPos = j;
    }

    // Abfrage des min-Wertes Temperatur
    if (tempPunkte[j] < tMin){
      tMin = tempPunkte[j];
      tMinPos = j;
    }
  }

  // Ausgabe der max- und min-Werte Temperatur sowie deren Position in der Liste
  //console.log("tMax: " + tMax + ", tMaxPos: " + tMaxPos);
  //console.log("tMin: " + tMin + ", tMinPos: " + tMinPos);

  // jetzt bei den max- und min-Werten ein Dreieck in den Graphen zeichnen!
  strokeWeight(2);
  stroke(255);

  // unter Null soll der Anzeiger unterhalb der Graphen sein,
  // sonst oberhalb!
  // max-Wert
  if (tMax <= 0){
    offset = 0;
    richtung = 1;
  } else {
    offset = -15;
    richtung = -1;
  }

  var y = height/2-(tMax*f)+offset;
  fill(255,0,0); // rot

  var spitzeX = 30 + (a*tMaxPos) + (w/2);
  var spitzeY = y+10;

  triangle(spitzeX,spitzeY,spitzeX-8,spitzeY+(15*richtung),spitzeX+8,spitzeY+(15*richtung))

  // unter Null soll der Anzeiger unterhalb der Graphen sein,
  // sonst oberhalb!
  // min-Wert
  if (tMin <= 0){
    offset = 0;
    richtung = 1;
  } else {
    offset = -15;
    richtung = -1;
  }

  var y = height/2-(tMin*f)+offset;
  fill(0,0,255); // blau

  var spitzeX = 30 + (a*tMinPos) + (w/2);
  var spitzeY = y+10;

  triangle(spitzeX,spitzeY,spitzeX-8,spitzeY+(15*richtung),spitzeX+8,spitzeY+(15*richtung))

  //================ Ausgabe außerhalb des Canvas ========================

  // Abfrage, wann 1. und letzter Eintrag war
  var Datum_Anfang = temperatur.getNum(0, 1) + "-" + temperatur.getNum(0, 2) + "-" + temperatur.getNum(0, 3);
  var ArrayLaenge = tempPunkte.length;
  var Datum_Ende = temperatur.getNum(ArrayLaenge-1, 1) + "-" + temperatur.getNum(ArrayLaenge-1, 2) + "-" + temperatur.getNum(ArrayLaenge-1, 3);

  // Angaben, wie viele Datensätze die Txt-Datei enthält in ein externen Div bei index.html
  var Datensatz = "<strong>temperatur.txt</strong> enthält " + j + " Datensätze; Zeitraum: <strong>" + Datum_Anfang + " bis " + Datum_Ende + "</strong>";
  document.getElementById("Datensatz").innerHTML = Datensatz;

  // höchste und tiefste Temperatur finden
  // Slice kopiert ein Array
  var temperaturSortiert = tempPunkte.slice(0);
  // sortiert das Array
  temperaturSortiert.sort(function(a, b){return a-b});

  // gibt höchste, niedrigste sowie Durchschnitts-Temperatur in Div AUSSERHALB des Canvas aus
  var minMaxTemperatur = "Niedrigste Temperatur: <strong style='color:blue;'>" + temperaturSortiert[0] + "</strong>, ";
  minMaxTemperatur += "höchste Temperatur: <strong style='color:red;'>" + temperaturSortiert[temperaturSortiert.length-1] + "</strong>, ";
  minMaxTemperatur += "Durchschnitt: <strong style='color:#fff;background-color:red;padding:0 .4em'>" + Durchschnitt + "</strong>";
  document.getElementById("minMaxTemperatur").innerHTML = minMaxTemperatur

  // Datum-Angabe in der Überschrift
  // jeweils des 1. Eintrag aus der Datei "temperatur"
  var Jahr = [temperatur.getNum(1, 1)];
  document.getElementById("Jahr").innerHTML = Jahr;
}

// zeichnet die senkrechte Linien, die den jeweiligen Monat beendet
// sowie den Monatsnamen oben und unten am Rand des Canvas
function monatsLinie(startPunkt,tage,laenge,Monatsname){
  // senkrechte Linie
  stroke(180);

  // Versatz der Linie u.a. abhängig von Anzahl der Tage im Monat
  var Versatz = a * tage * messProTag;

  // Pos. der senkrechten Linien abhängig von Anzahl der Tage im Monat
  var xStart = startPunkt+Versatz;
  line(xStart,5,xStart,height-5);

  // Monatsbeschriftung
  noStroke();
  fill(160);
  textAlign(RIGHT);
  text(Monatsname,startPunkt+Versatz-5,15);
  // text(Monatsname,startPunkt+(a*messProTag*tage)-5,height-5);

  // die Tages-Ziffern am unteren Rand des Canvas
  textAlign(CENTER);

  // Startpunkt abhängig von Variable "xStart", der senk. Monatslinien positioniert
  // Tagesziffern sind dazu jeweils um 28 bis 31 Tage nach links versetzt
  // Achtung: tage werden zusammenadddiert, werden also 31, 59 usw.
  // deswegen hier mit "laenge" rechnen = Angabe zur tatsächlichen Länge des Monats
  var rueckVersatz = a * laenge * messProTag;
  var TageStartPunkt = xStart - rueckVersatz;
  // console.log("xStart: " + xStart + ", Versatz: " + Versatz + ", rueckVersatz: " + rueckVersatz + ", TageStartPunkt: " + TageStartPunkt);

  // Februar berücksichtigen
  // in einem Nicht-Schaltjahr steht die Zahl "29" schon im März und ist falsch!
  if (laenge == 28 && Monatsname == "Februar"){
    Limit = 21;
  } else {
    Limit = 28;
  }

  for (var o=0; o <= Limit; o = o + 7) {
    // console.log(startPunkt+5+(o*a*messProTag));
    text(o+1,TageStartPunkt+5+(o*a*messProTag),height-5);
  }
}
