
import TC_MCNCImg from "../assets/images/tc-mcnc.png";
import UB_MCNCImg from "../assets/images/ub_mcnc.png";
import HN_MCNCImg from "../assets/images/hn_mcnc.png";

export const getMachineImg = (type: string) => {

    let Image;
    switch (type) {
        case "TC_MCNC": {
            Image = TC_MCNCImg;
            break;
        }
        case "HN_MCNC": {
            Image = HN_MCNCImg;
            break;
        }
        case "UB_MCNC": {
            Image = UB_MCNCImg;
            break;
        }
        default: {
            //statements;
            break;
        }
    }
    return Image;
};

export const getRangeOfTime = (start: string, end: string) => {
    //console.log(new Date(start).getTime(), new Date(end).getTime())
    const range = new Date(end).getTime() - new Date(start).getTime();
    return range;
};


export const diffMinutes = (start: string, end: string) => {

    let diff = (getRangeOfTime(start, end)) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

}
export const sortByTimestamp = (arr: any[]) => {
    arr.sort((date1: any, date2: any) => (new Date(date1.Timestamp).getTime() - new Date(date2.Timestamp).getTime()));
}
