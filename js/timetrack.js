function pad(num) {
    if ((num+"").length <2) {
        return "0"+num;
    }
    return num;
}
$(document).ready(function() {
    var tock = true;
    var now = new Date();
    $("#hour_in").val(now.getHours());
    $("#minute_in").val(parseInt(now.getMinutes()));
    Piecon.setOptions({
        color: '#848788', // Pie chart color
        background: '#ffffff', // Empty pie chart color
        shadow: '#479263', // Outer ring color
        fallback: false // Toggles displaying percentage in the title bar (possible values - true, false, 'force')
    });
    var update = function() {
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
            color: '#848788', // Pie chart color
            background: (tock ? '#ffffff' : "#eeeeee"), // Empty pie chart color
            shadow: '#479263', // Outer ring color
            fallback: false
        });
        tock=!tock;
        Piecon.setProgress(percent_done);
    };
    update();
    setInterval(update, 1000);
})
