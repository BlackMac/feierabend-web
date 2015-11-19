<?php
  if($_SERVER['SERVER_NAME'] != 'timetrack.me') {
  	header("HTTP/1.1 301 Moved Permanently");
  	header("Location: http://timetrack.me");
  	exit;
  }

  $title = "Wann ist Feierabend?";
  if (isset($_GET['t'])) {
    $time = intval($_GET['t']);
    $time = sprintf("%04d", $time);
    $realtime = substr($time, 0, 2).":".substr($time, 2, 2);
    $title = "Ich habe um ".$realtime." Feierabend";
  }
?>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title><?php echo $title?></title>

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@timetrackme" />

    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="<?php echo $title?>" />
    <meta property="og:image"         content="http://timetrack.me/img/<?php echo $time?>.png" />
    <meta property="og:image:type"    content="image/png" />
    <meta property="og:image:width"   content="700" />
    <meta property="og:image:height"  content="400" />
    <meta property="og:description"   content="Wann kannst du endlich nach Hause?" />

    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  </head>
  <body>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-48713823-1', 'auto');
      ga('send', 'pageview');
    </script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link href='https://fonts.googleapis.com/css?family=Lato:400,300,100' rel='stylesheet' type='text/css'>
    <link href='css/animate.css' rel='stylesheet' type='text/css'>
    <link href='css/style.css' rel='stylesheet' type='text/css'>
    <link href='css/featherlight.min.css' rel='stylesheet' type='text/css'>
    <div class="container full">
      <div class="content animated zoomInDown">
        <div class="definition">
          <h1>Feierabend</h1>
          <p class="pronounciation">
            /ˈfaɪ̯ɐˌʔaːbənt/
          </p>
          <p class="category">
            Substantiv
          </p>
          <p class="description">
            <i class="fa fa-info-circle"></i> Zeitspanne oder Zeitpunkt des Arbeitsendes
          </p>
        </div>
        <div class="control preview">
          <a href="javascript:"><i class="fa fa-pencil-square-o handle"></i></a>
          <p>
            Ankunft:<br>
            <div class="inputgroup"><input type="text" id="hours-arrival" maxlength="2"><span class="inputspacer">&nbsp;: </span><input type="text" id="minutes-arrival" maxlength="2"></div>
          </p>
          <p>
            Arbeitszeit:<br>
            <div class="inputgroup"><input type="text" id="hours-scheduled" value="08" maxlength="2"><span class="inputspacer">&nbsp;h </span><input type="text" id="minutes-scheduled" value="00" maxlength="2"> min</div>
          </p>
          <p>
            Pause:<br>
            <div class="inputgroup"><input type="text" id="hours-break" value="00" maxlength="2"><span class="inputspacer">&nbsp;h </span><input type="text" id="minutes-break" value="30" maxlength="2"> min</div>
          </p>
        </div>
        <div class="output">
          <h1>Feierabend</h1>
          <span class="time" id="finishing_at">18:44</span><br>
          <div class="progressbar"><div class="progress" id="time_progress"></div></div>
          <span class="details" id="finishing_in">in 4 Stunden 23 Minuten</span>
        </div>
        <div class="social">
          <a href="javascript:"><i class="fa fa-share-square"></i> Teilen</a>
          <div class="networks">
            <a href="javascript:" class="link-share-fb"><i class="fa fa-facebook-square"></i></a>
            <a href="javascript:" class="link-share-twitter"><i class="fa fa-twitter-square"></i></a>
          </div>
        </div>
      </div>
    </div>

    <div id="footer"><a href="impressum.html" data-featherlight="ajax">Impressum</a> • <a href="datenschutz.html" data-featherlight="ajax">Datenschutz</a></div>
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>

    <!-- JS -->
    <script src="js/lib/js.cookie.min.js"></script>
    <script src="js/lib/piecon.js"></script>
    <script src="js/lib/featherlight.min.js"></script>
    <script src="js/timetrack/helpers.js"></script>
    <script src="js/timetrack.js"></script>
    <!-- /JS -->
  </body>
</html>
