var Cookies = {
  data: {},
  reset: function() {
    this.data = {};
  },
  get: function(key) {
    if (typeof this.data[key] === "undefined") return null;
    return this.data[key];
  },
  set: function(key, value) {
    this.data[key] = value;
    return undefined;
  }
}

QUnit.module( "pad", function() {
  QUnit.test( "pad should return two digit numbers unchanged", function( assert ) {
    assert.equal(pad(12), 12);
  });

  QUnit.test( "pad should return single digit number zero padded", function( assert ) {
    assert.equal(pad(2), "02");
  });
});

QUnit.module( "setup", function() {
  QUnit.module( "arrival", function() {
    QUnit.test( "setup.arrival.hours should return hours when no cookie is set", function( assert ) {
      Cookies.reset();
      var now = new Date();
      assert.equal(setup.arrival.hours(), now.getHours());
    });

    QUnit.test( "setup.arrival.hours should return value passed when no cookie is set", function( assert ) {
      assert.equal(setup.arrival.hours(4), 4);
    });

    QUnit.test( "setup.arrival.hours should return cookie value", function( assert ) {
      setup.arrival.hours(6);
      assert.equal(setup.arrival.hours(), 6);
    });

    QUnit.test( "setup.arrival.minutes should return minutes when no cookie is set", function( assert ) {
      Cookies.reset();
      var now = new Date();
      assert.equal(setup.arrival.minutes(), now.getMinutes());
    });

    QUnit.test( "setup.arrival.minutes should return value passed when no cookie is set", function( assert ) {
      assert.equal(setup.arrival.minutes(4), 4);
    });

    QUnit.test( "setup.arrival.minutes should return cookie value", function( assert ) {
      setup.arrival.minutes(6);
      assert.equal(setup.arrival.minutes(), 6);
    });
  });
  QUnit.module( "scheduled", function() {
    QUnit.test( "setup.scheduled.hours should default of 8 when no cookie is set", function( assert ) {
      Cookies.reset();
      assert.equal(setup.scheduled.hours(), 8);
    });

    QUnit.test( "setup.scheduled.minutes should default of 0 when no cookie is set", function( assert ) {
      Cookies.reset();
      assert.equal(setup.scheduled.minutes(), 0);
    });
  });

});
