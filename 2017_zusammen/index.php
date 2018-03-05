<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <meta charset="utf-8">
    <title>Temperatur-Kurve, P5</title>
    <meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
    <!-- allgemeines Stylesheet, für alle Temperatur-Grafen gleich -->
    <link rel="stylesheet" href="../assets/c/style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.min.js"></script>
    <!-- das jeweils speizielle, ist hier nur die Verbindung zur richtigen Datei "temperatur.txt" -->
    <script src="sketch.js"></script>
    <!-- hier speziel wegen extra breiten Canvas -->
    <script src="../assets/js/routine_jahr.js"></script>
    <script src="../assets/js/externe_functionen.js"></script>
  </head>
  <body>
    <h1>Temperatur-Kurve | Küchenfenster | Gesamtjahr <span id="Jahr" style="color:red;"></span></h1>
    <p>
      <span id="minMaxTemperatur"></span><br>
      <span id="Datensatz"></span><br><br>
      <span><a href="../">← aktuelle Kurve</a></span>
    </p>
    <?php include("../assets/php/naviMenu.php"); ?>
  </body>
</html>
