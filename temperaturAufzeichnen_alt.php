#!/usr/bin/php
<?php
// Temperatur einlesen
// Tutorial-Kombi:
// hier das Setup (vorallem wg. /boot/config.txt) beachten: http://www.modmypi.com/blog/ds18b20-one-wire-digital-temperature-sensor-and-the-raspberry-pi
// dann wegen sudo nano /etc/modules und PHP folgendes: http://www.einplatinencomputer.com/raspberry-pi-1-wire-temperatursensor-ds1820-ansteuern/
// kombiniert mit https://raspberry.tips/hausautomatisierung/wetteraufzeichnung-mit-raspberry-pi-ds18b20/

// das Script wird nicht direkt von der index.php aufgerufen, sondern via crontab -- nur dadurch ist es möglich
// dass das Script regelmäßig (also z.b. alle 15min) ausgeführt wird!
// Aufruf bei sudo crontab -e
// */15 * * * * /usr/bin/wget -O /dev/null -q http://localhost:8080/temperatur/temperaturAufzeichnen.php

// hier den jeweils richtigen Sensor eintragen!
$temp = exec('cat /sys/bus/w1/devices/28-0000031eef47/w1_slave |grep t=');
$temp = explode('t=',$temp);
$temp = $temp[1] / 1000;
$temp = round($temp,2);

// erzeugt eine Text-Datei und speichert die Werte (Datum, Uhrzeit, Temperatur) untereinander
// "Creating a File" aus dem Buch ""Learning PHP, MySQL, Javascript, CSS & HTML5"
// Achtung, folgender Code überschreibt den Inhalt der Datei, falls die Datei schon existiert!

$myfile = fopen('temperatur.txt', 'a') or die('Konnte keine Datei erzeugen!');

// http://selfphp.de/funktionsreferenz/datums_und_zeit_funktionen/date.php
// erzeugt z.B. 2016-07-08-16-59-43
// $datum = date("Y-m-d; H:i:s");
$datum = date("Y,m,d,H,i,s");

// $text = $datum . "; " . $temp . " &#x00B0;C";
$text = $temp . "," . $datum;

fwrite($myfile, "\n". $text) or die('Konnte die Datei nicht befüllen!');

fclose($myfile);

// Minimal-Temperatur
// http://stackoverflow.com/questions/5775452/php-read-specific-line-from-file
$minFile = "min-temp.txt";
$minlines = file($minFile);//file in to an array

$minTemp = $minlines[1]; //zeile 2, weil zeile 1 leer ist
// echo "minTemp " . $minTemp;

if ($minTemp > $temp){
	// echo "niedrigere Min-Temperatur!";

	$minTemp = fopen('min-temp.txt', 'w') or die('Konnte min-temperatur.txt nicht erzeugen!');
	$minT = $temp . "\n" . $datum;
	fwrite($minTemp, "\n". $minT) or die('Konnte die Datei nicht befüllen!');
	fclose($minTemp);
}

// Maximal-Temperatur
// http://stackoverflow.com/questions/5775452/php-read-specific-line-from-file
$maxFile = "max-temp.txt";
$maxlines = file($maxFile);//file in to an array

$maxTemp = $maxlines[1]; //zeile 2, weil zeile 1 leer ist
// echo $maxTemp . ", " . $temp;

if ($maxTemp < $temp){
	// echo "höhere Max-Temperatur!";
	$maxTemp = fopen('max-temp.txt', 'w') or die('Konnte max-temperatur.txt nicht erzeugen!');
	$maxT = $temp . "\n" . $datum;
	fwrite($maxTemp, "\n". $maxT) or die('Konnte die Datei nicht befüllen!');
	fclose($maxTemp);
}

// die folgende Textdatei wird von einem anderen RasPi (thiasPi.local) ausgelesen
// und enthält die akt. Temperatur und Datum Uhrzeit
$momTemp = fopen('momentane-temp.txt', 'w') or die('Konnte momentane-temperatur.txt nicht erzeugen!');
$momT = $temp . "\n" . $datum;
fwrite($momTemp, "\n". $momT) or die('Konnte die Datei nicht befüllen!');
fclose($momTemp);
?>
