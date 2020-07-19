import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import moment from 'moment';

export const GetTimeAgo = (date, style) => {
  var local = new Date(date);
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  if (style === 'short') {
    return timeAgo.format(local, 'twitter');
  } else if (style === 'long') {
    return moment(date).format('LT');
  } else {
    return moment(date).format('LL');
  }
};

export const formatCallTime = date => {
  return moment(date).format('LLLL');
};

export const diff_minutes = (dt2, dt1) => {
  if (dt2 !== null && dt1 !== null) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  } else {
    return 0;
  }
};
