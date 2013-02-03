$(document).ready(function() {

  function roundVal(val, dec) {
    var result = Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
  }

  function getMinsToGo(togo) {
    val = roundVal(roundVal(togo - Math.floor(togo), 2) * 60, 0);
    if(val == 0) {
      return false;
    }
    return val;
  }

  function getHoursToGo(togo) {
    return Math.floor(togo * Math.pow(10, 0)) / Math.pow(10, 0);
  }

  function updateTime() {

    var d = new Date();

    var day = d.getDay();
    var hour = d.getHours();

    var one_hour = 1000 * 60 * 60

    var weekday = false;
    // Is it a weekday?
    if(day > 0 && day < 6) {
      weekday = true;
    }

    var message = '';

    // Clone Date and set some defaults.
    var targetDate = new Date(d);

    targetDate.setMinutes(00);
    targetDate.setSeconds(00);

    var beeroclock = false;

    // If its a weekend, check its after 12.
    if(!weekday) {

      targetDate.setHours(12);

      togo = roundVal(parseFloat((targetDate.getTime() - d.getTime()) / (one_hour)), 2);

      mins_togo = getMinsToGo(togo);
      hours_togo = getHoursToGo(togo);

      hours_msg = '';
      if(hours_togo) {
        hours_msg = hours_togo + ' hrs ';
        if(mins_togo) {
          hours_msg += 'and ';
        }
      }

      mins_msg = '';
      if(mins_togo) {
        mins_msg = mins_togo + 'mins';
      }

      if(hour > 11) {
        message = '<span class="button yesbutton">Yes it is!</span>';
        message2 = 'YES! Its Beer\ O\'Clock!';
        beeroclock = true;
      } else {
        message = '<span class="button nobutton">Not Yet!</span><p><strong>You only have ' + hours_msg + mins_msg + ' to wait.</strong></p>';
        message2 = 'Only ' + hours_msg + mins_msg + ' until Beer\ O\'Clock!!';
      }
    } else {

      targetDate.setHours(17);
      togo = roundVal(parseFloat((targetDate.getTime() - d.getTime()) / (one_hour)), 2);

      mins_togo = getMinsToGo(togo);
      hours_togo = getHoursToGo(togo);

      hours_msg = '';
      if(hours_togo) {
        hours_msg = hours_togo + ' hrs ';
        if(mins_togo) {
          hours_msg += 'and ';
        }
      }

      mins_msg = '';
      if(mins_togo) {
        mins_msg = mins_togo + 'mins';
      }

      if(hour > 16) {
        message = '<span class="button yesbutton">Yes it is!</span>';
        message2 = 'YES! Its Beer\ O\'Clock!';
        beeroclock = true;
      } else {
        message = '<span class="button nobutton">Not Yet!</span><p><strong>You only have ' + hours_msg + mins_msg + ' to wait.</strong></p>';
        message2 = 'Only ' + hours_msg + mins_msg + ' until Beer\ O\'Clock!!';
      }
    }

    // Lets find out where it IS beer oclock
    if(!beeroclock) {
      $.ajax({
        url: "beeroclock.php"
      }).done(function(data) {
        boc = $.parseJSON(data);
        boc_html = "<span class='fret'>Don't fret! It <em>is</em> Beer O'clock in the following locations!</span><ul>";
        console.log(boc);
        for(i in boc) {
          boc_html += '<li>' + boc[i].name + ' - ' + boc[i].time + '</li>';
        }
        boc_html += '</ul>';

        $('#beeroclock').html();
        $('#beeroclock').html(boc_html);
      });
    }

    $('#togo').html();
    $('#togo').html(message);

    $('.share').empty();
    $('.share').prepend('<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://beeroclock.info" data-text="' + message2 + '" data-via="cbiggins" data-size="large">Tweet</a>');
    $.getScript("http://platform.twitter.com/widgets.js");

    $('.share').append('<a href="https://twitter.com/cbiggins" class="twitter-follow-button" data-show-count="false" data-size="large">Follow @cbiggins</a>');

    window.setInterval(updateTime, 60000);
  }

  updateTime();
});