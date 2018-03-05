// einzelne Funktionen für die Übersichtlichkeit

function grundSettings(breite){
  createCanvas(breite, 840);
  background(255);
  textAlign(RIGHT);
  textFont("Roboto"); //bei index.html als Google-Font importiert
}

function waagrechteLinien(){
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
}

function senkrechteLinien(){
  // 31 Tage anzeigen
  for (var n=0; n <= 31; n++) {
    line(28+(n*a*messProTag),10,28+(n*a*messProTag),height-10);
  }

  // die Ziffern am oberen Rand des Canvas
  textAlign(CENTER);
  for (var o=0; o <= 30; o++) {
    text(o+1+".",44+(o*a*messProTag),13);
    text(o+1+".",44+(o*a*messProTag),height-5);
  }
}

function durchschnittstemperatur(){
  var Summe = 0;

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
    // Durchschnitt = "noch zu wenig Datensätze!";
    Durchschnitt = 0;
  }
}

// Temperatur des gleichen Monats (Jahrs), ein Jahr davor
// als Vertex-Linie
function alteTemperaturKurve() {
  // nur wenn es die Table "temperatur_alt" gibt, wird auch der Graph gezeichnet
  if (temperatur_alt){
    var rowCount_alt = temperatur_alt.getRowCount();
    for (var i = 0; i < rowCount_alt; i++) {
      tempPunkte_alt[i] = temperatur_alt.getNum(i, 0);
    }
  }

  stroke("rgba(0,0,0,.25)");
  noFill();

  beginShape();
  for (var j = 0; j < tempPunkte_alt.length; j++) {
    var x = 30+(a*j);
    var y = height/2-(tempPunkte_alt[j]*f);
    vertex(x, y);
  }
  endShape();
}

// Achtung, diese Funktion gibt ein Array zurück!
function dreieckSpitze(tWert){
  if (tWert <= 0){
    offset = 0;
    richtung = 1;
  } else {
    offset = -15;
    richtung = -1;
  }
  // returns beide Werte als Array
  return [offset, richtung];
}

function dreieckZeichnen(farbe,tWert,offset,tWertPos,richtung){

  if (farbe == "rot"){
    fill(255,0,0);
  } else {
    fill(0,0,255);
  }

  var y = height/2-(tWert*f)+offset;

  var spitzeX = 30 + (a*tWertPos) + (w/2);
  var spitzeY = y+10;

  triangle(spitzeX,spitzeY,spitzeX-8,spitzeY+(15*richtung),spitzeX+8,spitzeY+(15*richtung))

  textAlign(CENTER);

  // Positionieren unter- oder oberhalb des Dreiecks
  if (richtung == 1){
    var abstand = 33;
  } else {
    var abstand = -20;
  }
  // Anzeige der min- und max-Werte am jeweiligen Dreieck
  text(tWert,spitzeX,spitzeY+abstand);
}

function angabenAusserhalbCanvas(j){
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


}

// Datum-Angabe in der Überschrift
// Verhält sich unterschiedlich bei Monat und ganzes Jahr!
function datumAusgabe(zeitraum){
  if (zeitraum == "Monat"){
    // jeweils des 1. Eintrag aus der Datei "temperatur"
    var Monat = [temperatur.getNum(1, 2)];
    var Jahr = [temperatur.getNum(1, 1)];
    document.getElementById("Datum").innerHTML = Monat + "." + Jahr;
  } else {
    var Jahr = [temperatur.getNum(1, 1)];
    document.getElementById("Jahr").innerHTML = Jahr;
  }
}

// SONDERFALL bei Jahresdarstellung!
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
