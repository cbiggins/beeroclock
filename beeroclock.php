<?php

$datefmt = 'H:i:s';

$localtimezone = 'Australia/Sydney';

$localtime = new DateTime;
$localtime->setTimeZone(new DateTimeZone($localtimezone));

$cities = array(
  'London'        => 'Europe/London',
  'Paris'         => 'Europe/Paris',
  'Sydney'        => 'Australia/Sydney',
  'Auckland'      => 'Pacific/Auckland',
  'New York'      => 'America/New_York',
  'Los Angeles'   => 'America/Los_Angeles',
  'Mexico City'   => 'America/Mexico_City',
  'Dublin'        => 'Europe/Dublin',
  'Buenos Aires'  => 'America/Buenos_Aires',
  'Monaco'        => 'Europe/Monaco',
  'Rome'          => 'Europe/Rome',
  'Berlin'        => 'Europe/Berlin',
  'Helsinki'      => 'Europe/Helsinki',
);

$beeroclock = array();
foreach ($cities as $city => $tz) {
  $d = new DateTime;
  $d->setTimeZone(new DateTimeZone($tz));

  $w = $d->format('w');
  $h = $d->format('H');

  // What day is it?
  if ($w == 6 || $w == 0) {
    // Its a weekend.
    $boc = 12;
  }
  else {
    $boc = 17;
  }

  // Where is it beer oclock?
  if ($h >= $boc) {
    $beeroclock[] = array('name' => $city, 'time' => $d->format($datefmt));
  }
}

print json_encode($beeroclock);