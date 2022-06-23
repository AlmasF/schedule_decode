import {time} from '../../../utils/calendar-info';
import Col from './col';
import Item from './item';

function TimeColumn(){
    let showTime = [(<Item />)];
    showTime = showTime.concat(time.map(
        (t, i) => (
            <Item><span>{t}</span></Item>
        )
    ));

    return (
        <Col>{showTime}</Col>
    );
};

export default TimeColumn;