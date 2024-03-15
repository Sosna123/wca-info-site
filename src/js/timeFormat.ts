import {EventType} from '../js/types'

//* normal times
function formatNormal(time: string): string{
    let result: string;

    //* Actual time formatting
    let timeNum: number = Number(time)

    let minutes: number = Math.trunc(timeNum / 6000);
    let seconds: number = Math.trunc((timeNum - (minutes * 6000)) / 100);
    let centiseconds: number = Math.trunc(timeNum - ((minutes * 6000) + (seconds * 100)))

    //* conversion from number to string
    let secondsStr: string = seconds.toString();
    let centisecondsStr: string = centiseconds.toString();

    //* adding 0 in front of 1 digit numbers
    if(secondsStr.length == 1 && minutes){
        secondsStr = "0" + secondsStr
    }
    if(centisecondsStr.length == 1){
        centisecondsStr = "0" + centisecondsStr
    }

    //* returning correct-looking result
    result = minutes ? `${minutes}:${secondsStr}.${centisecondsStr}` : `${secondsStr}.${centisecondsStr}`

    return result;
}

//* new multiblind
function formatNewMbf(time: string): string{
    //*  0DDTTTTTMM
    //*  difference    = 99 - DD
    //*  timeInSeconds = TTTTT (99999 means unknown)
    //*  missed        = MM
    //*  solved        = difference + missed
    //*  attempted     = solved + missed


    let hours: number, minutes: number, seconds: number
    let minutesStr: string, secondsStr: string
    let timeToSolve: number, diffrence: number, missed: number, solved: number, attempted: number
    let result: string

    let timeArr: string[] = time.split('')

    missed = Number(`${timeArr[timeArr.length - 2]}${timeArr[timeArr.length - 1]}`);
    timeToSolve = timeArr.length === 10 ? Number(`${timeArr[3]}${timeArr[4]}${timeArr[5]}${timeArr[6]}${timeArr[7]}`) : Number(`${timeArr[3]}${timeArr[4]}${timeArr[5]}${timeArr[6]}`);

    diffrence = 99 - Number(`${timeArr[0]}${timeArr[1]}`)
    solved = diffrence + missed
    attempted = solved + missed

    if(timeToSolve === 9999){
        result = `${solved}/${attempted} in unknown time`
        return result
    }
    hours = timeToSolve >= 3600 ? Math.trunc(timeToSolve / 3600) : 0;

    minutes = timeToSolve >= 3600 ? Math.trunc((timeToSolve - (hours * 3600)) / 60) : Math.trunc(timeToSolve / 60);
    minutesStr = minutes.toString().length === 1 ? `0` + minutes.toString(): minutes.toString()
        
    seconds = timeToSolve >= 3600 ? Math.trunc(timeToSolve - ((hours * 3600) + (minutes *60))) : timeToSolve - minutes * 60;
    secondsStr = seconds.toString().length === 1 ? `0` + seconds.toString() : seconds.toString()
    

    result = timeToSolve >= 3600 ? `${solved}/${attempted} ${hours}:${minutesStr}:${secondsStr}` : `${solved}/${attempted} ${minutesStr}:${secondsStr}`

    return result
}

//* old multiblind
function formatOldMbf(time: string): string{
    //*  1SSAATTTTT
    //*  solved        = 99 - SS
    //*  attempted     = AA
    //*  timeInSeconds = TTTTT (99999 means unknown)

    let hours: number, minutes: number, seconds: number
    let minutesStr: string, secondsStr: string
    let timeToSolve: number, solved: number, attempted: number
    let result: string

    let timeArr: string[] = time.split('')
    timeToSolve = timeArr.length === 10 ? Number(`${timeArr[5]}${timeArr[6]}${timeArr[7]}${timeArr[8]}${timeArr[9]}`) : Number(`${timeArr[2]}${timeArr[3]}${timeArr[4]}${timeArr[5]}${timeArr[6]}`);
    
    solved = timeArr.length === 10 ? 99 - Number(`${timeArr[1]}${timeArr[2]}`) : 99 - Number(`${timeArr[0]}${timeArr[1]}`)
    
    attempted = timeArr.length === 10 ? Number(`${timeArr[3]}${timeArr[4]}`) : Number(`${timeArr[2]}${timeArr[3]}`)
    
    if(timeToSolve === 9999){
        result = `${solved}/${attempted} in unknown time`
        return result
    }
    hours = timeToSolve >= 3600 ? Math.trunc(timeToSolve / 3600) : 0;
    
    minutes = timeToSolve >= 3600 ? Math.trunc((timeToSolve - (hours * 3600)) / 60) : Math.trunc(timeToSolve / 60);
    minutesStr = minutes.toString().length === 1 ? `0` + minutes.toString(): minutes.toString()
    
    seconds = timeToSolve >= 3600 ? Math.trunc(timeToSolve - ((hours * 3600) + (minutes *60))) : timeToSolve - minutes * 60;
    secondsStr = seconds.toString().length === 1 ? `0` + seconds.toString() : seconds.toString()
    
    
    result = timeToSolve >= 3600 ? `${solved}/${attempted} ${hours}:${minutesStr}:${secondsStr}` : `${solved}/${attempted} ${minutesStr}:${secondsStr}`
    
    console.log(`time: ${time}; solved: ${solved}; attempted: ${attempted}`)
    return time
    // return result
}

//* check which function to use
function formatTime(time: number|string, type: EventType = 'normal'): string{
    time = time.toString()

    //* DNF, DNS check
    if(time === "-2"){
        return 'DNS'
    }
    if(time === "-1"){
        return 'DNF'
    }
    if(time === "0"){
        return 'false'
    }

    //* normal type
    if(type === 'normal'){
        return formatNormal(time)
    }
    //* fmc
    if(type === 'fmc'){
        return time;
    }
    //* new mbf
    if(type === 'new-mbf'){
        return formatNewMbf(time)
    }
    //* old mbf
    if(type === 'old-mbf'){
        return formatOldMbf(time)
    }

    return ''
}

export default formatTime