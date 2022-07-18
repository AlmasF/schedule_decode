export function removeById(arr, id){
    console.log('from reducers removeById', arr, id);
    return arr.filter(item => item.id !== id);
}

export function updateGroup(arr, group){
    group.start = group.start.toString();
    group.end = group.end.toString();
    return arr.map(record => record.id === group.id ? group : record);
}

export function updateMentor(arr, mentor){
    return arr.map(record => record.id === mentor.id ? mentor : record);
}

export function updateLessonInWeek(arr, lesson){
    lesson.time = lesson.time.toString();
    lesson.weekday = lesson.weekday.toString();
    return arr.map(record => record.id === lesson.id ? lesson : record);
}