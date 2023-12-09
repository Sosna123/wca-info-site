//* normal times
function formatNormal(time) {
    var result;
    //* Actual time formatting
    if (time.length === 6) {
        result = "".concat(time[0]).concat(time[1], ":").concat(time[2]).concat(time[3], ".").concat(time[4]).concat(time[5]);
    }
    if (time.length === 5) {
        result = "".concat(time[0], ":").concat(time[1]).concat(time[2], ".").concat(time[3]).concat(time[4]);
    }
    if (time.length === 4) {
        result = "".concat(time[0]).concat(time[1], ".").concat(time[2]).concat(time[3]);
    }
    if (time.length === 3) {
        result = "".concat(time[0], ".").concat(time[1]).concat(time[2]);
    }
    if (time.length === 2) {
        result = "0.".concat(time[0]).concat(time[1]);
    }
    return result;
}
//* new multiblind
function formatNewMbf(time) {
    //*  0DDTTTTTMM
    //*  difference    = 99 - DD
    //*  timeInSeconds = TTTTT (99999 means unknown)
    //*  missed        = MM
    //*  solved        = difference + missed
    //*  attempted     = solved + missed
    var hours, minutes, seconds;
    var minutesStr, secondsStr;
    var timeToSolve, diffrence, missed, solved, attempted;
    var result;
    var timeArr = time.split('');
    missed = Number("".concat(timeArr[timeArr.length - 2]).concat(timeArr[timeArr.length - 1]));
    timeToSolve = timeArr.length === 10 ? Number("".concat(timeArr[3]).concat(timeArr[4]).concat(timeArr[5]).concat(timeArr[6]).concat(timeArr[7])) : Number("".concat(timeArr[3]).concat(timeArr[4]).concat(timeArr[5]).concat(timeArr[6]));
    diffrence = 99 - Number("".concat(timeArr[0]).concat(timeArr[1]));
    solved = diffrence + missed;
    attempted = solved + missed;
    if (timeToSolve === 9999) {
        result = "".concat(solved, "/").concat(attempted, " in unknown time");
        return result;
    }
    else {
        hours = timeToSolve >= 3600 ? Math.trunc(timeToSolve / 3600) : 0;
        minutes = timeToSolve >= 3600 ? Math.trunc((timeToSolve - (hours * 3600)) / 60) : Math.trunc(timeToSolve / 60);
        if (minutes.toString().length === 1) {
            minutesStr = "0" + minutes.toString();
        }
        seconds = timeToSolve >= 3600 ? Math.trunc(timeToSolve - ((hours * 3600) + (minutes * 60))) : timeToSolve - minutes * 60;
        if (seconds.toString().length === 1) {
            secondsStr = "0" + seconds.toString();
        }
    }
    result = timeToSolve >= 3600 ? "".concat(solved, "/").concat(attempted, " ").concat(hours, ":").concat(minutesStr, ":").concat(secondsStr) : "".concat(solved, "/").concat(attempted, " ").concat(minutesStr, ":").concat(secondsStr);
    return result;
}
//* check which function to use
function formatTime(time, type) {
    if (type === void 0) { type = 'normal'; }
    time = time.toString();
    //* DNF, DNS check
    if (time === "-2") {
        return 'DNS';
    }
    if (time === "-1") {
        return 'DNF';
    }
    if (time === "0") {
        return '';
    }
    //* normal type
    if (type === 'normal') {
        return formatNormal(time);
    }
    //* fmc
    if (type === 'fmc') {
        return time;
    }
    //* new mbf
    if (type === 'new-mbf') {
        return formatNewMbf(time);
    }
}
module.exports = { formatTime: formatTime };
