function preload() {
  temperatur = loadTable("temperatur.txt");

  // Temperatur des gleichen Monats, ein Jahr davor laden
  temperatur_alt = loadTable("../2017_01/temperatur.txt");
}
