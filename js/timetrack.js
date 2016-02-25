function getScheduledSeconds() {
  minutesScheduled = 0;
  minutesScheduled += parseInt($("#hours-scheduled").val())*60;
  minutesScheduled += parseInt($("#minutes-scheduled").val());
  minutesScheduled += parseInt($("#hours-break").val())*60;
  minutesScheduled += parseInt($("#minutes-break").val());
  return minutesScheduled*60000;
}

function share_fb(url) {
}

function fillFields() {
  $("#hours-arrival").val(pad(setup.arrival.hours())+"");
  $("#minutes-arrival").val(pad(setup.arrival.minutes())+"");
  $("#hours-scheduled").val(pad(setup.scheduled.hours())+"");
  $("#minutes-scheduled").val(pad(setup.scheduled.minutes())+"");
  $("#hours-break").val(pad(setup.break.hours())+"");
  $("#minutes-break").val(pad(setup.break.minutes())+"");
}

function storeDefaults() {
  setup.arrival.hours($("#hours-arrival").val());
  setup.arrival.minutes($("#minutes-arrival").val());
  setup.scheduled.hours($("#hours-scheduled").val());
  setup.scheduled.minutes($("#minutes-scheduled").val());
  setup.break.hours($("#hours-break").val());
  setup.break.minutes($("#minutes-break").val());
}

$(document).ready(function() {
  var notificationShown = false;
  timeUpNotificationSetup();
  fillFields();
  $(".nav-left").click(function() {
    ga('send', 'event', 'Intent', 'Click', 'DayBack');
    $('<div class="popover-wrapper"><div class="popover">\
      <h3>We should have a history together</h3>\
      <p>Sign up for <strong>timetrack.me plus</strong> to store your history.</p>\
      <ul>\
        <li>Detailed analytics and statistics</li>\
        <li>SMS, mail or push when it\'s time to leave.</li>\
        <li>Location based check in &amp; out.</li>\
      </ul>\
      <div class="slider-container"><div class="slider">\
        <div class="price-box">\
          <div class="price">\
            $ 19.99\
            <span class="description">per year</span>\
          </div>\
          <div class="price">\
            $ 1.99\
            <span class="description">per month</span>\
          </div>\
        </div>\
        <div class="signup">\
          <form action="//timetrack.us5.list-manage.com/subscribe/post?u=82b0c888e7f8cce9d1ba2371a&amp;id=a1e803a1e1" method="post" target="_blank">\
            <label for="email-signup">We are sorry, but we did not launch timetrack.me plus yet.\
            Sign up here to be informed when we do and get <strong>six full months of timetrack.me plus free.</strong></label>\
            <br><br>\
            <div class="formrow"><input type="email" id="email-signup" name="EMAIL" placeholder="your@email.com" \\>\
            <button type="submit">subscribe</button></div><br>\
          </form>\
        </div>\
      </div></div>\
      <a href="#" class="optout">I don\'t need timetrack.me plus.</a>\
    </div></div>')
      .appendTo("body")
      .click(function(e) {
        if(e.target != this) return;
        ga('send', 'event', 'Intent', 'Click', 'OptOut', 'Outside');
        $('.popover-wrapper').remove();
      });
    $('.price').click(function() {
      ga('send', 'event', 'Intent', 'Click', 'SelectPrice', this.innerText);
      $('.slider').addClass("position2");
    });
    $('.optout').click(function() {
      ga('send', 'event', 'Intent', 'Click', 'OptOut', 'Link');
      $('.popover-wrapper').remove();
    });
    $('.popover-wrapper').fadeIn(320);
    //$(wrapper).append('<div class="popover"></div>');
  });
  $("div.social").click(function() {
    ga('send', 'event', 'Intent', 'Click', 'ShareSocial');
    $("div.social .networks").toggleClass("visible");
  });
  var finish = "1700";

  $(".link-share-fb").click(function() {
    var url="http://timetrack.me/"+finish;

    window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url),'facebook-share-dialog',"width=626,height=436")
  });
  $(".link-share-twitter").click(function() {
    var finish_hr = [finish.slice(0, 2), ":", finish.slice(2)].join('');
    var url="Ich habe heute um "+finish_hr+" Feierabend. http://timetrack.me/"+finish+" /via @timetrackme";

    window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(url),'twitter-share-dialog',"width=626,height=436")
  });
  $(".handle").click(function() { $(".control").toggleClass("preview")});
  $("input:text").blur(function() { $(this).val(pad($(this).val())) } );
  $("input:text").focus(function() { $(this).select(); } );
  $("input:text").keyup(function (event) {
    if (event.which == 9) return;
    if (this.value.length == this.maxLength) {
      $(this).nextAll('input:text').focus();
    }
    update();
  });
  window.setTimeout(function() {
      $("div.control").removeClass("preview");
    }, 1500);

  var tock = true;

  Piecon.setOptions({
      color: '#0f2231', // Pie chart color
      background: '#ffffff', // Empty pie chart color
      shadow: '#000000', // Outer ring color
      fallback: false // Toggles displaying percentage in the title bar (possible values - true, false, 'force')
  });
  var update = function() {
    storeDefaults();

    var now = new Date();
    var arrivalTime = new Date();
    arrivalTime.setHours($("#hours-arrival").val());
    arrivalTime.setMinutes($("#minutes-arrival").val());
    arrivalTime.setSeconds(0);


    var required_time = new Date(getScheduledSeconds());
    var elapsed = (now - arrivalTime);
    var diff = new Date(elapsed);
    var end_time = new Date(arrivalTime.getTime() + required_time.getTime());
    var remaining_time = new Date(end_time-now);

    var percent_done=(required_time-remaining_time)/required_time*100;
    finish = pad(end_time.getHours())+""+pad(end_time.getMinutes());

    $("#hours-arrival").html(pad(diff.getUTCHours())+" Stunden<br>"+pad(diff.getUTCMinutes())+" Minuten<br>"+pad(diff.getUTCSeconds())+ " Sekunden");
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
    var remaining = end_time-now;
    if (remaining <= 0 && remaining >= -2000) {
      if (!notificationShown) {
        notificationShown = true;
        timeUpNotification();
      }
    } else {
      notificationShown = false;
    }
  };
  update();
  setInterval(update, 1000);
})
