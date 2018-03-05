<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <meta charset="utf-8">
    <title>Temperatur-Kurve, P5</title>
    <meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
    <!-- allgemeines Stylesheet, für alle Temperatur-Grafen gleich -->
    <link rel="stylesheet" href="assets/c/style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.min.js"></script>
    <!-- das jeweils speizielle, ist hier nur die Verbindung zur richtigen Datei "temperatur.txt" -->
    <script src="sketch.js"></script>
    <!-- das eigentliche Script, das für die Darstellung des Graphen sorgt -->
    <script src="assets/js/routine.js"></script>
    <script src="assets/js/externe_functionen.js"></script>
  </head>
  <body>

    <h1>Temperatur-Kurve | Küchenfenster | <span id="Datum"></span></h1>
    <p>
      <span id="minMaxTemperatur"></span><br>
      <span id="Datensatz"></span><br><br>
      <span><a href="../">← Live-Kamera</a></span>
    </p>

    <nav>
      <ul>
        <li><a href="2017_01">01.2017</a></li>
        <li><a href="2017_02">02.2017</a></li>
        <li><a href="2017_03">03.2017</a></li>
        <li><a href="2017_04">04.2017</a></li>
        <li><a href="2017_05">05.2017</a></li>
        <li><a href="2017_06">06.2017</a></li>
        <li><a href="2017_07">07.2017</a></li>
        <li><a href="2017_08">08.2017</a></li>
        <li><a href="2017_09">09.2017</a></li>
        <li><a href="2017_10">10.2017</a></li>
        <li><a href="2017_11">11.2017</a></li>
        <li><a href="2017_12">12.2017</a></li>
        <li><a href="2017_zusammen">∑ 2017</a></li>
      </ul>

      <ul>
        <li><a href="2018_01">01.2018</a></li>
        <li><a href="2018_02">02.2018</a></li>
        <li><a href="2018_zusammen">∑ 2018</a></li>
      </ul>

    </nav>
  </body>
</html>
