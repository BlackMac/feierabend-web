<?php
$title = "Unbekannt";
if (isset($_GET['t'])) {
  $time = intval($_GET['t']);
  $time = sprintf("%04d", $time);
  $realtime = substr($time, 0, 2).":".substr($time, 2, 2);
  $title = trim($realtime);
}
list($imgwidth, $imgheight, $imgtype, $imgattr) = getimagesize("bg/image.png");

$my_img = imagecreatefrompng ( "bg/image.png" );
$logo = imagecreatefrompng ( "img/ttlogo.png" );
$text_colour = imagecolorallocate( $my_img, 255, 255, 255 );
$shadow_colour = imagecolorallocatealpha( $my_img, 40, 40, 40, 60 );

$bounds = imagettfbbox ( 80, 0 , "fonts/Lato-Thin.ttf" , $title );
$width = abs($bounds[4] - $bounds[0]);
$height = abs($bounds[5] - $bounds[1]);
imagettftext( $my_img, 80, 0, ($imgwidth-$width)/2-6, $imgheight/2+$height/2+1, $shadow_colour, "fonts/Lato-Thin.ttf", $title );
imagettftext( $my_img, 80, 0, $imgwidth/2-$width/2-7, $imgheight/2+$height/2, $text_colour, "fonts/Lato-Thin.ttf", $title );

$bounds = imagettfbbox ( 30, 0 , "fonts/Lato-Medium.ttf" , "Ich habe heute um" );
$width = abs($bounds[4] - $bounds[0]);
$height = abs($bounds[5] - $bounds[1]);
imagettftext( $my_img, 30, 0, $imgwidth/2-$width/2+1, 110+1, $shadow_colour, "fonts/Lato-Medium.ttf", "Ich habe heute um" );
imagettftext( $my_img, 30, 0, $imgwidth/2-$width/2, 110, $text_colour, "fonts/Lato-Medium.ttf", "Ich habe heute um" );


$bounds = imagettfbbox ( 30, 0 , "fonts/Lato-Medium.ttf" , "Feierabend." );
$width = abs($bounds[4] - $bounds[0]);
$height = abs($bounds[5] - $bounds[1]);
imagettftext( $my_img, 30, 0, $imgwidth/2-$width/2+1, 315+1, $shadow_colour, "fonts/Lato-Medium.ttf", "Feierabend." );
imagettftext( $my_img, 30, 0, $imgwidth/2-$width/2, 315, $text_colour, "fonts/Lato-Medium.ttf", "Feierabend." );
/*
$bounds = imagettfbbox ( 14, 0 , "fonts/Lato-Medium.ttf" , "Und Ihr? Findet es raus auf timetrack.me" );
$width = abs($bounds[4] - $bounds[0]);
$height = abs($bounds[5] - $bounds[1]);
imagettftext( $my_img, 14, 0, $imgwidth/2-$width/2+1, 330+1, $shadow_colour, "fonts/Lato-Medium.ttf", "Und Ihr? Findet es raus auf timetrack.me" );
imagettftext( $my_img, 14, 0, $imgwidth/2-$width/2, 330, $text_colour, "fonts/Lato-Medium.ttf", "Und Ihr? Findet es raus auf timetrack.me" );
*/

imagecopy($my_img, $logo, 650, 330, 0, 0, 40, 34);

header( "Content-type: image/png" );
imagepng( $my_img );
imagecolordeallocate( $line_color );
imagecolordeallocate( $text_color );
imagecolordeallocate( $background );
imagedestroy( $my_img );
?>
