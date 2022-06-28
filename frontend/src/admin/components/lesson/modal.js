import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createMentor, updateMentor } from '../../../store/actions/mentor.actions';
import { getActiveGroups } from '../../../store/actions/group.actions';
import { Modal, Input, Button, Form, Select} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { createLesson } from '../../../store/actions/lesson.actions';

function LessonModal(
    {
        isModalVisible, 
        handleCancel, 
        loading, 
        getActiveGroupsAction,
        mentors,
        errors,
        createLessonAction
    })
    {
    const [course_id, setCourse] = useState('');
    const [group_id, setGroup] = useState('');
    const [mentor_id, setMentor] = useState('');
    const [room_id, setRoom] = useState('');
    const [lessonInputs, setLessonInputs] = useState('');

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

    useEffect(()=>{
        if(!loading && !errors){
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
        getActiveGroupsAction()
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
                <Form.Item validateStatus={errors && errors.course_id ? 'error' : 'success'} help={errors && errors.course_id ? errors.course_id : ''}>
                    <Select
                    showSearch>
                    </Select>
                </Form.Item>
            <Input size='large' placeholder='Введите имя ментора' value={mentor_id} onChange={onChangeMentor} prefix={<UserOutlined />}/>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => ({
    updateMentorAction: bindActionCreators(updateMentor, dispatch),
    getActiveGroupsAction: bindActionCreators(getActiveGroups, dispatch),
    createLessonAction: bindActionCreators(createLesson, dispatch)
});

const mapStateToProps = (state) => ({
    loading: state.lessonsReducers.isLoading,
    errors: state.lessonsReducers.errors,
    mentor: state.mentorReducers.mentors
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonModal);