function preload() {
  temperatur = loadTable("temperatur.txt");

  // Temperatur des Jahres davor laden
  temperatur_alt = loadTable("../2017_zusammen/temperatur.txt");
}
