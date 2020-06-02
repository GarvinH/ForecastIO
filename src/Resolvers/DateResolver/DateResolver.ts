//takes unix time stamp
export const timestampToAdjustedDate =(timestamp: number, timezone: number): Date => (
    new Date(timestamp * 1000 + timezone * 1000)
)





//MAKE SURE ARGUMENTS HAVE BEEN ADJUSTED TO TIMEZONE


//can't use Date locale methods as it will not adjust to searched location
//That is EDT searching PDT gets EDT time.
export const getDayString = (day: number): string => {
    switch (day) {
        case(0):
            return "Sunday"
        case(1):
            return "Monday"
        case(2):
            return "Tuesday"
        case(3):
            return "Wednesday"
        case(4):
            return "Thursday"
        case(5):
            return "Friday"
        case(6):
            return "Saturday"
        default:
            return ""
    }
}

export const getMonthString = (month: number): string => {
    switch (month) {
        case(0):
            return "January"
        case(1):
            return "February"
        case(2):
            return "March"
        case(3):
            return "April"
        case(4):
            return "May"
        case(5):
            return "June"
        case(6):
            return "July"
        case(7):
            return "August"
        case(8):
            return "September"
        case(9):
            return "October"
        case(10):
            return "November"
        case(11):
            return "December"
        default:
            return ""
    }
}

export const getTimeString = (hour: number, minutes: number): string => {
    const mins = minutes > 9? minutes : "0" + minutes

    if (hour === 0) {
        return "12:"+mins +" am"
    } else if (hour < 12) {
        return hour+":"+mins +" am"
    } else if (hour === 12) {
        return "12:" + mins + " pm"
    } else {
        return (hour-12)+":"+mins +" pm"
    }
}

export const timestampToTimeString = (timestamp: number, timezone: number) => {
    const date = timestampToAdjustedDate(timestamp, timezone)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    return getTimeString(hours, minutes)
}