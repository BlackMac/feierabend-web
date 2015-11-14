function pad(num) {
    if ((num+"").length <2) {
        return "0"+num;
    }
    return num;
}

function currentTime() {
  var now = new Date();
  return now;
}

function timeUpNotification() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    var notification = new Notification("Endlich Feierabend!");
  }
}
function timeUpNotificationSetup() {
  if (!("Notification" in window)) {
    return;
  }
  else if (Notification.permission === "granted") {
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
    });
  }
}

var setup = {
  arrival: {
    hours: function(setHours) {
      if (setHours) {
        Cookies.set('startHours', setHours);
      }
      var resultHours = parseInt(Cookies.get('startHours') || currentTime().getHours());
      return resultHours;
    },
    minutes: function(setMinutes) {
      if (setMinutes) {
        Cookies.set('startMinutes', setMinutes);
      }
      var resultMinutes = parseInt(Cookies.get('startMinutes') || currentTime().getMinutes());
      return resultMinutes;
    }
  },
  scheduled: {
    hours: function(setHours) {
      if (setHours) {
        Cookies.set('scheduledHours', setHours);
      }
      var resultHours = parseInt(Cookies.get('scheduledHours') || 8);
      return resultHours;
    },
    minutes: function(setMinutes) {
      if (setMinutes) {
        Cookies.set('schduledMinutes', setMinutes);
      }
      var resultMinutes = parseInt(Cookies.get('schduledMinutes') || 0);
      return resultMinutes;
    }
  },
  break: {
    hours: function(setHours) {
      if (setHours) {
        Cookies.set('breakHours', setHours);
      }
      var resultHours = parseInt(Cookies.get('breakHours') || 0);
      return resultHours;
    },
    minutes: function(setMinutes) {
      if (setMinutes) {
        Cookies.set('breakMinutes', setMinutes);
      }
      var resultMinutes = parseInt(Cookies.get('breakMinutes') || 30);
      return resultMinutes;
    }
  }
}
