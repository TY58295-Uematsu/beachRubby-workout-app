const createSunday = (n) => {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth() ;
    let date = today.getDate();
    let day_num = today.getDay();
    let thisSunday = date - day_num;
    let targetSunday = thisSunday - (n*7);
    // let 
    return {year:thisYear, month:thisMonth, date:targetSunday}
}


console.log(new Date());
console.log(createSunday(2).year,createSunday(2).month+1,createSunday(2).date);
console.log(new Date(createSunday(2).year,createSunday(2).month,createSunday(2).date,9));

console.log(createSunday(1).year,createSunday(1).month+1,createSunday(1).date);
console.log(new Date(createSunday(1).year,createSunday(1).month,createSunday(1).date,9));
console.log(createSunday(0).year,createSunday(0).month+1,createSunday(0).date);
console.log(new Date(createSunday(0).year,createSunday(0).month,createSunday(0).date,9));

 let initialValue = [
    {workout_day :new Date(createSunday(2).year,createSunday(2).month,createSunday(2).date, 9), youtube_url :'https://www.youtube.com/watch?v=7KI9f-CyqvA', workout1 :2, workout2 :3, workout3 :4, workout4 :2, workout5 :4, workout6:3 },
    {workout_day :new Date(createSunday(1).year,createSunday(1).month,createSunday(1).date, 9), youtube_url :'https://www.youtube.com/watch?v=gx-MObLPz8c', workout1 :2, workout2 :2, workout3 :3, workout4 :2,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(0).year,createSunday(0).month,createSunday(0).date, 9), youtube_url :'', workout1 :3, workout2 :2,workout3 :4, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-1).year,createSunday(-1).month,createSunday(-1).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-2).year,createSunday(-2).month,createSunday(-2).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-3).year,createSunday(-3).month,createSunday(-3).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-4).year,createSunday(-4).month,createSunday(-4).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-5).year,createSunday(-5).month,createSunday(-5).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-6).year,createSunday(-6).month,createSunday(-6).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-7).year,createSunday(-7).month,createSunday(-7).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-8).year,createSunday(-8).month,createSunday(-8).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-9).year,createSunday(-9).month,createSunday(-9).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-10).year,createSunday(-10).month,createSunday(-10).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-11).year,createSunday(-11).month,createSunday(-11).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-12).year,createSunday(-12).month,createSunday(-12).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-13).year,createSunday(-13).month,createSunday(-13).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-14).year,createSunday(-14).month,createSunday(-14).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-15).year,createSunday(-15).month,createSunday(-15).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
    {workout_day :new Date(createSunday(-16).year,createSunday(-16).month,createSunday(-16).date, 9), youtube_url :'', workout1 :1, workout2 :1,workout3 :1, workout4 :1,workout5 :1, workout6:1 },
]

module.exports= initialValue;