function pad(num) {
    if ((num+"").length <2) {
        return "0"+num;
    }
    return num;
}

function startTime() {
  var now = new Date();
  return now;
}
function startHours(hours) {
  if (hours) {
    Cookies.set('startHours', hours);
  }
  var startHours = Cookies.get('startHours') || startTime().getHours();
  return parseInt(startHours);
}

function startMinutes(minutes) {
  if (minutes) {
    Cookies.set('startMinutes', minutes);
  }
  var startMinutes = Cookies.get('startMinutes') || startTime().getHours();
  return parseInt(startMinutes)
}

function requiredHours(hours) {
  if (hours) {
    Cookies.set('requiredHours', hours);
  }
  var requiredHours = Cookies.get('requiredHours') || 8;
  return parseInt(requiredHours);
}

function requiredMinutes(minutes) {
  if (minutes) {
    Cookies.set('requiredMinutes', minutes);
  }
  var requiredMinutes = Cookies.get('requiredMinutes') || 0;
  return parseInt(requiredMinutes)
}
$(document).ready(function() {
    var tock = true;

    $("#hour_in").val(startHours());
    $("#minute_in").val(startMinutes());
    $("#hours_required").val(requiredHours);
    $("#minutes_required").val(requiredMinutes);

    Piecon.setOptions({
        color: '#0f2231', // Pie chart color
        background: '#ffffff', // Empty pie chart color
        shadow: '#000000', // Outer ring color
        fallback: false // Toggles displaying percentage in the title bar (possible values - true, false, 'force')
    });
    var update = function() {
      startHours($("#hour_in").val());
      startMinutes($("#minute_in").val());
      requiredHours($("#hours_required").val());
      requiredMinutes($("#minutes_required").val());

      var now = new Date();
      var in_time = new Date();
      in_time.setHours($("#hour_in").val());
      in_time.setMinutes($("#minute_in").val());
      in_time.setSeconds(0);

      var required_time = new Date((parseInt($("#hours_required").val())*60+parseInt($("#minutes_required").val()))*60000);
      var elapsed = (now - in_time);
      var diff = new Date(elapsed);
      var end_time = new Date(in_time.getTime() + required_time.getTime());
      var remaining_time = new Date(end_time-now);

      var percent_done=(required_time-remaining_time)/required_time*100;

      $("#in_time").html(pad(diff.getUTCHours())+" Stunden<br>"+pad(diff.getUTCMinutes())+" Minuten<br>"+pad(diff.getUTCSeconds())+ " Sekunden");
      $("#finishing_at").text(pad(end_time.getHours())+":"+pad(end_time.getMinutes()));
      if (Math.round(percent_done) < 100) {
        $("#time_progress").css("width", percent_done+"%");
        $("#finishing_in").html("in&nbsp;"+pad(remaining_time.getUTCHours())+"&nbsp;Stunden "+pad(remaining_time.getUTCMinutes())+"&nbsp;Minuten ");
        $("title").text(pad(remaining_time.getUTCHours())+":"+pad(remaining_time.getUTCMinutes())+" bis Feierabend");
      } else {
        percent_done = 100;
        $("#time_progress").css("width", "100%");
        remaining_time = new Date(now-end_time);
        $("#finishing_in").html("vor&nbsp;"+pad(remaining_time.getUTCHours())+"&nbsp;Stunden "+pad(remaining_time.getUTCMinutes())+"&nbsp;Minuten ");
        $("title").text(pad(remaining_time.getUTCHours())+":"+pad(remaining_time.getUTCMinutes())+" seit Feierabend");
      }

      Piecon.setOptions({
          color: '#0f2231', // Pie chart color
          background: (tock ? '#ffffff' : "#eeeeee"), // Empty pie chart color
          shadow: '#000000', // Outer ring color
          fallback: false
      });
      tock=!tock;
      Piecon.setProgress(percent_done);
    };
    update();
    setInterval(update, 1000);
})
