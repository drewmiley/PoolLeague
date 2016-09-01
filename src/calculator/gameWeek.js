import gameWeekDates from '../data/gameWeekDates';

const now = new Date();

const gameWeek = (() => {
    let i = 0;
    while (now > gameWeekDates[i]) {
        i++;
    }
    return i;
})();

export default gameWeek;