import EventType from '../js/types'

//* normal times
function formatNormal(time: string): string{
    let result: string;

    //* Actual time formatting
    if(time.length === 6){
        result = `${time[0]}${time[1]}:${time[2]}${time[3]}.${time[4]}${time[5]}` 
    }
    else if(time.length === 5){
        result = `${time[0]}:${time[1]}${time[2]}.${time[3]}${time[4]}` 
    }
    else if(time.length === 4){
        result = `${time[0]}${time[1]}.${time[2]}${time[3]}` 
    }
    else if(time.length === 3){
        result = `${time[0]}.${time[1]}${time[2]}` 
    }
    else if(time.length === 2){
        result = `0.${time[0]}${time[1]}`
    }
    else{
        result = time
    }

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
        return ''
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

    return 'd'
}

export default formatTime