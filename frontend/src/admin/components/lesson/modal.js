import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {updateMentor } from '../../../store/actions/mentor.actions';
import { getActiveGroups } from '../../../store/actions/group.actions';
import { getRooms } from '../../../store/actions/room.actions';
import { getCourses } from '../../../store/actions/course.actions';
import { getMentors } from '../../../store/actions/mentor.actions';
import { Modal, Button, Select, Form} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import { weekdays, time } from '../../../utils/calendar-info';
import { bindActionCreators } from 'redux';
import { createLesson } from '../../../store/actions/lesson.actions';

const { Option } = Select;


function LessonModal(
    {
        isModalVisible, 
        handleCancel, 
        loading, 
        getActiveGroupsAction,
        getRoomsAction,
        getCoursesAction,
        getMentorsAction,
        courses,
        activeGroups,
        mentors,
        rooms,
        errors,
        createLessonAction
    })
    {

    const [course_id, setCourse] = useState('');
    const [group_id, setGroup] = useState('');
    const [mentor_id, setMentor] = useState('');
    const [room_id, setRoom] = useState('');
    const [lessonInputs, setLessonInputs] = useState([{
        time: '',
        weekday: ''
    }]);

    const handleOk = () => {
        createLessonAction(
            {
                course_id,
                group_id,
                mentor_id,
                room_id,
                lessonInputs
            }
        )
    };

    const onChangeWeekday = (index, value) => {
        const list = [...lessonInputs];
        list[index].weekday = value;
        setLessonInputs(list);
    }

    const onChangeTime = (index, value) => {
        const list = [...lessonInputs];
        list[index].time = value;
        setLessonInputs(list);
    }
    
    const onChangeCourse = (value) => {
        setCourse(value);
    }
    
    const onChangeMentor = (value) => {
        setMentor(value);
    }

    const onChangeGroup = (value) => {
        setGroup(value);
    }

    const onChangeRoom = (value) => {
        setRoom(value);
    }

    const addLesson = () => {
        setLessonInputs([...lessonInputs, {weekday: '', time: ''}])
    }

    const deleteLesson = (index) => {
        const list = [...lessonInputs];
        list.splice(index, 1);
        setLessonInputs(list);
    }

    useEffect(()=>{
        if(!loading){
            setCourse('');
            setGroup('');
            setRoom('');
            setMentor('');
            setLessonInputs([{
                time: '',
                weekday: ''
            }]);
            handleCancel();
        } 
    }, [loading])

    useEffect(() => {
        getActiveGroupsAction();
        getRoomsAction();
        getCoursesAction();
        getMentorsAction();
    }, []);

    return (
        <Modal 
        title="Добавление записи"
        onCancel={handleCancel}
        visible={isModalVisible}
        footer={[
                <Button key="back" onClick={handleCancel}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Сохранить
                </Button>,
            ]}>
            <Form.Item 
                style={{
                    width: "100%",    
                }}
                validateStatus={errors && errors.course_id ? "error" : "success"}
                help={errors && errors.course_id ? errors.course_id : ""}
                >
                <Select
                    showSearch
                    size="large"
                    placeholder="Курс"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={onChangeCourse}
                >
                    {courses.map(item => <Option value={item.id}>{item.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item
            style={{
                width: "100%",    
            }}
            validateStatus={errors && errors.group_id ? "error" : "success"}
            help={errors && errors.group_id ? errors.group_id : ""}
            >
                <Select
                    showSearch
                    size="large"
                    placeholder="Группа"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={onChangeGroup}
                >
                    {activeGroups.map(item => <Option value={item.id}>{item.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item 
            style={{
                width: "100%",    
            }}
            validateStatus={errors && errors.mentor_id ? "error" : "success"}
            help={errors && errors.mentor_id ? errors.mentor_id : ""}
            >
                <Select
                    showSearch
                    size="large"
                    placeholder="Ментор"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={onChangeMentor}
                >
                    {mentors.map(item => <Option value={item.id}>{item.full_name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item
            style={{
                width: "100%",
            }}
            validateStatus={errors && errors.room_id ? "error" : "success"}
            help={errors && errors.room_id ? errors.room_id : ""}
            >
                <Select
                    showSearch      
                    size="large"
                    placeholder="Кабинет"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={onChangeRoom}
                >
                    {rooms.map(item => <Option value={item.id}>{item.number}</Option>)}
                </Select>
            </Form.Item>
            {lessonInputs.map((lessonInput, index) => <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative'
            }}>
                <Form.Item
                    style={{
                        width: "calc(50% - 10px)",
                    }}
                    validateStatus={
                        errors && 
                        errors.lessonInputs && 
                        errors.lessonInputs[index] && 
                        errors.lessonInputs[index].weekday ? "error" : "success"
                    }
                    help={
                        errors && 
                        errors.lessonInputs && 
                        errors.lessonInputs[index] && 
                        errors.lessonInputs[index].weekday ? errors.lessonInputs[index].weekday : ""
                    }
                    >
                    <Select
                        showSearch
                        size="large"
                        placeholder="День недели"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        onChange={value => onChangeWeekday(index, value)}
                        
                    >
                        {weekdays.map(item => <Option value={item}>{item}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    style={{
                        width: "calc(50% - 10px)",
                    }}
                    validateStatus={
                        errors && 
                        errors.lessonInputs && 
                        errors.lessonInputs[index] && 
                        errors.lessonInputs[index].time ? "error" : "success"
                    }
                    help={
                        errors && 
                        errors.lessonInputs && 
                        errors.lessonInputs[index] && 
                        errors.lessonInputs[index].time ? errors.lessonInputs[index].time : ""
                    }>
                    <Select
                        showSearch
                        size="large"
                        placeholder="Время"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        onChange={value => onChangeTime(index, value)}
                    >
                        {time.map(item => {
                            let t = item.split(' ');
                            t = t[0];
                            return <Option value={item}>{item}</Option>
                            }
                        )}
                    </Select>
                </Form.Item>
                <CloseOutlined 
                onClick={() => deleteLesson(index)}
                style={{
                    color: '#f00',
                    position: 'absolute',
                    right: '-18px',
                    top: '13px',
                    cursor: 'pointer',
                }}/>
            </div>)}
            <Button onClick={addLesson}>Add</Button>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getRoomsAction: bindActionCreators(getRooms, dispatch),
    getCoursesAction: bindActionCreators(getCourses, dispatch),
    getMentorsAction: bindActionCreators(getMentors, dispatch),
    updateMentorAction: bindActionCreators(updateMentor, dispatch),
    getActiveGroupsAction: bindActionCreators(getActiveGroups, dispatch),
    createLessonAction: bindActionCreators(createLesson, dispatch),
});

const mapStateToProps = (state) => 
{
    console.log(state.lessonReducers);
    return {
        loading: state.lessonReducers.isLoading,
        rooms: state.roomReducers.rooms,
        courses: state.courseReducers.courses,
        mentors: state.mentorReducers.mentors,
        activeGroups: state.groupReducers.activeGroups,
        errors: state.lessonReducers.errors,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonModal);