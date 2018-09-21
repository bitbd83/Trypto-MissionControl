import moment from 'moment'

export const createObject = (key, value) =>  {
    var obj = {};
    var parts = key.split('.');
    if(parts.length == 1) {
        obj[parts[0]] = value;
    } else if(parts.length > 1) {
        // concat all but the first part of the key
        var remainingParts = parts.slice(1,parts.length).join('.');
        obj[parts[0]] = createObject(remainingParts, value);
    }
    return obj;
};

export const parseBoolean = (string) => {
  var bool;
  bool = (function() {
    switch (false) {
      case string.toLowerCase() !== 'true':
        return true;
      case string.toLowerCase() !== 'false':
        return false;
    }
  })();
  if (typeof bool === "boolean") {
    return bool;
  }
  return void 0;
};


export const convertTimezone = (timezone, time, timeFormat) => {
  var date = '';
  if (timezone && time && timeFormat) {
    date = moment
      .tz(time.format(timeFormat), timezone.baseUtcOffset)
      .utc().format();
  }
  return date;
}

export const getRandomCode = (length_) => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ'.split('');
  if (typeof length_ !== "number") {
      length_ = Math.floor(Math.random() * chars.length_);
  }
  var str = '';
  for (var i = 0; i < length_; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
