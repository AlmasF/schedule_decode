import LessonInfo from './lesson-info';
import BusyInfo from './busy-info';
import {weekdays, time} from '../../../utils/calendar-info';
import Col from './col';
import Item from './item';

function Calendar(props){
    const {data} = props;

    const showItem = function(weekday, t){
        let hour = t.split(' ');
        hour = hour[0];
        let val = data.filter(item => item.time === hour && item.weekday === weekday);
        val = val[0];
        return ((val && val.course) || (val && val.group)) ? 
        (<LessonInfo course={val.course.name} group={val.group.name} mentor={val.mentor.full_name} room={val.room.number}/>) :
        val && val.text ?
        (<BusyInfo text={val.text}/>) :
        (<span></span>);
    }

    let freeTimes = {};
    let start = null, end = null;
    let startEndTimes = [];

    let calendar = weekdays.map(weekday => 
        {
            let showTime = [(<Item key={weekday + 1}>{weekday}</Item>)];
            
            time.map(
                (t) => {
                    if(showItem(weekday, t).type === 'span') {
                        if(freeTimes[t]) freeTimes[t] = freeTimes[t] + 1;
                        else freeTimes[t] = 1;
                    }
                }
            );

         
            showTime = showTime.concat(time.map(
                (t, i) => {
                    return (
                        <Item key={i + 1} time={t}>
                            {showItem(weekday, t)}
                        </Item>
                    )
                }
            ));

            return (
                <Col>
                    {showTime}
                </Col>
            );
        });


    for(let x in freeTimes){
        if(freeTimes[x] !== 7) {
            startEndTimes.push(x);
        }
    }

    startEndTimes = startEndTimes.map(
        (item) => {
            return item.substring(0, 2);
        }
    )

    startEndTimes.sort();
    start = startEndTimes[0];
    end = startEndTimes[startEndTimes.length - 1];
    
    for(let x in freeTimes){
        if(freeTimes[x] === 7 && (x.substring(0,2) < start || x.substring(0,2) > end)){
            for(let i = 0; i < 7; i++){
                for(let j = 1; j < calendar[i].props.children.length; j++){
                    if(calendar[i].props.children[j].props.time === x){
                        calendar[i].props.children.splice(j, 1);
                    }
                }
            }
        }
    }

    return (
        <div className="calendar">
            {calendar}
        </div>
    );
}

export default Calendar;