function Item(props){
    return (
        
        <div key={0} className='calendar-item'>
            {props.children}
            <span className="calendar-item--time">
                {props.time}
            </span>
        </div>
    );
};

export default Item;