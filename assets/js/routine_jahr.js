var temperatur; // ein p5 Table
var temperaturString; // ein p5 String
var tempPunkte = [];
var Durchschnitt = 0; // Durchschnittstemperatur

// ======================

// Temperatur des gleichen Monats (Jahres), ein Jahr davor
var temperatur_alt; // ein p5 Table
var temperaturString_alt; // ein p5 String
var tempPunkte_alt = [];

// ======================

var w = 1; // Breite des Temperatur-Rechtecks
var a = 2; // Abstand zwischen den Temperatur-Rechtecken
var f = 10; // Faktor beim Verstärken des Temperaturwertes
var messProTag = 6; // wieviele Messungen pro Tag werden angezeigt?

function setup() {

  //Grundeinstellungen
  grundSettings(4440);

  // geht Zeile für Zeile durch die Textdatei "temperatur.txt"
  // und zieht dabei den jeweils 1. Eintrag (hier Temperatur-Werte) in das Array "tempPunkte[]"
  var rowCount = temperatur.getRowCount();
  for (var i = 0; i < rowCount; i++) {
    tempPunkte[i] = temperatur.getNum(i, 0);
  }

  // console.log("Temperatur, 1. Eintrag: " + tempPunkte[0]);
  // console.log("Länge von tempPunkte: " + tempPunkte.length);

  //================ waagrechte Linien und Temperatur-Beschriftungen ================

  waagrechteLinien();

  //================ senkrechte Linien und Tage ========================

  var startPunkt = 28; // Anfangs-x-Wert der senkrechten Linie

  // 366 Tage anzeigen
  for (var n=0; n <= 366; n++) {
    line(startPunkt+(n*a*messProTag),10,startPunkt+(n*a*messProTag),height-10);
  }

  // Monatslinien und Monats-Beschriftungen, SONDERFALL bei Jahresdarstellung!

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

  durchschnittstemperatur();

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

  // ============== Temperatur des gleichen Montats, ein Jahr davor ========

  // als Vertex-Linie gezeichnet
  alteTemperaturKurve();

  // ======================

  // Ausgabe der max- und min-Werte Temperatur sowie deren Position in der Liste
  //console.log("tMax: " + tMax + ", tMaxPos: " + tMaxPos);
  //console.log("tMin: " + tMin + ", tMinPos: " + tMinPos);

  // jetzt bei den max- und min-Werten ein Dreieck in den Graphen zeichnen!
  strokeWeight(2);
  stroke(255);

  // unter Null soll der Anzeiger unterhalb der Graphen sein,
  // sonst oberhalb!
  // max-Wert

  // dreieckWerte ist ein Array!
  var dreieckWerte = dreieckSpitze(tMax);
  var offset = dreieckWerte[0];
  var richtung = dreieckWerte[1];

  dreieckZeichnen("rot",tMax,offset,tMaxPos,richtung);

  // unter Null soll der Anzeiger unterhalb der Graphen sein,
  // sonst oberhalb!
  // auch die Spitze des Dreiecks passt sich an, ob oberhalb oder unterhalb des Graphen
  // min-Wert
  var dreieckWerte = dreieckSpitze(tMin);
  var offset = dreieckWerte[0];
  var richtung = dreieckWerte[1];

  dreieckZeichnen("blau",tMin,offset,tMinPos,richtung);

  //================ Ausgabe außerhalb des Canvas ========================

  // Datensätze, min- und max-Wert, Zeitraum AUSSERHALB des Canvas
  angabenAusserhalbCanvas(j);

  // Datum-Angabe in der Überschrift
  datumAusgabe("Jahr")

}
