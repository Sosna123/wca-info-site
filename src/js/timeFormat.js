//* normal times
function formatNormal(time){
    //* Actual time formatting
    if(time.length === 6){
        time = `${time[0]}${time[1]}:${time[2]}${time[3]}.${time[4]}${time[5]}` 
    }
    if(time.length === 5){
        time = `${time[0]}:${time[1]}${time[2]}.${time[3]}${time[4]}` 
    }
    if(time.length === 4){
        time = `${time[0]}${time[1]}.${time[2]}${time[3]}` 
    }
    if(time.length === 3){
        time = `${time[0]}.${time[1]}${time[2]}` 
    }
    if(time.length === 2){
        time = `0.${time[0]}${time[1]}`
    }

    return time;
}

//* new multiblind
function formatNewMbf(time){
    //*  0DDTTTTTMM
    //*  difference    = 99 - DD
    //*  timeInSeconds = TTTTT (99999 means unknown)
    //*  missed        = MM
    //*  solved        = difference + missed
    //*  attempted     = solved + missed


    let hours, minutes, seconds
    let timeToSolve, diffrence, missed, solved, attempted
    let result

    let timeArr = time.split('')
    console.log(timeArr)

    missed = Number(`${timeArr[timeArr.length - 2]}${timeArr[timeArr.length - 1]}`);
    timeToSolve = timeArr.length === 10 ? Number(`${timeArr[3]}${timeArr[4]}${timeArr[5]}${timeArr[6]}${timeArr[7]}`) : Number(`${timeArr[3]}${timeArr[4]}${timeArr[5]}${timeArr[6]}`);

    console.log(timeToSolve)

    diffrence = 99 - Number(`${timeArr[0]}${timeArr[1]}`)
    solved = diffrence + missed
    attempted = solved + missed

    if(timeToSolve === 9999){
        timeToSolve = 9999;
    }else if(timeToSolve >= 3600){
        hours = Math.trunc(timeToSolve / 3600)
        minutes = Math.trunc((timeToSolve - (hours * 3600)) / 60)
        if(minutes.toString().length === 1){
            minutes = `0` + minutes.toString()
        }

        seconds = Math.trunc(timeToSolve - ((hours * 3600) + (minutes * 60)))
        if(seconds.toString().length === 1){
            seconds = `0` + seconds.toString()
        }
    }else{
        minutes = Math.trunc(timeToSolve / 60)
        if(minutes.toString().length === 1){
            minutes = `0` + minutes.toString()
        }

        seconds = timeToSolve - minutes * 60
        if(seconds.toString().length === 1){
            seconds = `0` + seconds.toString()
        }
    }


    if(timeToSolve === 9999){
        result = `${solved}/${attempted} in unknown time`
        return result
    }else{
        hours = timeToSolve >= 3600 ? Math.trunc(timeToSolve / 3600) : 0;

        minutes = timeToSolve >= 3600 ? Math.trunc((timeToSolve - (hours * 3600)) / 60) : Math.trunc(timeToSolve / 60);
        if(minutes.toString().length === 1){
            minutes = `0` + minutes.toString()
        }
        
        seconds = timeToSolve >= 3600 ? Math.trunc(timeToSolve - ((hours * 3600) + (minutes * 60))) : timeToSolve - minutes * 60;
        if(seconds.toString().length === 1){
            seconds = `0` + seconds.toString()
        }
    }

    if(timeToSolve >= 3600){
        result = `${solved}/${attempted} ${hours}:${minutes}:${seconds}`
    }else{
        result = `${solved}/${attempted} ${minutes}:${seconds}`
    }

    return result
}

module.exports = { formatNormal, formatNewMbf };