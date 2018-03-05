function preload() {
  temperatur = loadTable("temperatur.txt");

  // Temperatur des gleichen Montats, ein Jahr davor laden
  temperatur_alt = loadTable("2017_03/temperatur.txt");
}
