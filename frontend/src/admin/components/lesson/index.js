import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteLesson } from '../../../store/actions/lesson.actions';
import { searchLessons, autoCompleteFunc} from '../../../store/actions/search.actions';
import { useState, useEffect } from 'react';
import LessonModal from './modal';
import {Typography, Button, Space, Table} from "antd";
import Input from '../../../client/components/input';
const {Title} = Typography;


function Lessons(props){
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const [editMentor, setEditMentor] = useState(null);
    const [search, setSearch] = useState('');
    const onChange = (e) => {
        setSearch(e.target.value);
        props.autoCompleteFunc(e.target.value);
    };
    const onSelectItem = (key, value) => {
        props.searchLessonsAction({key, value});
        setSearch('');
        props.autoCompleteFunc();
    }
    const columns = [
        {
            title: 'Weekday',
            dataIndex: 'weekday',
            key: 'weekday',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (item) => <a>{item}</a>,
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
            render: (item) => <a>{item && item.name}</a>,
        },
        {
            title: 'Group',
            dataIndex: 'group',
            key: 'group',
            render: (item) => <a>{item && item.name}</a>,
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
            render: (item) => <a>{item && item.number}</a>,
        },
        {
            title: 'Mentor',
            dataIndex: 'mentor',
            key: 'full_name',
            render: (item) => <a>{item && item.full_name}</a>,
        },
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'text',
            render: (item) => <a>{item}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'right',
            render: (_, record) => (
            <Space size="middle">
                <a>Редактировать</a>
                <a onClick={
                        () => {
                            return props.deleteLessonAction(record.id);
                        }
                    }
                    >
                    Удалить
                </a>
            </Space>
            ),
        },
    ];
    
    const startEditMentor = (record) => {
        setEditMentor(record);
    }

    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditMentor(null);
    };

    useEffect(() => {
        props.searchLessonsAction({key: 'group_id', value: "1"});
    }, [])

    return (
        <div>
            <div className="page-header">
                <Title>Расписание</Title>
                <div className='page-header--actions'>
                    <Input onChange={onChange} value={search} data={props.autoCompleteData} onSelectItem={onSelectItem} placeholder='Mentor, Group, Room'/>
                    <Button type='primary' size={'large'} onClick={showModal}>
                        Добавить запись
                    </Button>
                </div>
            </div>
            <Table columns={columns} dataSource={props.list} rowKey={item => item.id}/>

            <LessonModal isModalVisible={isModalVisible} handleCancel={handleCancel} mentor={editMentor}/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    list: state.searchReducers.list,
    autoCompleteData: state.searchReducers.autoCompleteData
})

const mapDispatchToProps = (dispatch) => ({
    searchLessonsAction: bindActionCreators(searchLessons, dispatch),
    deleteLessonAction: bindActionCreators(deleteLesson, dispatch),
    autoCompleteFunc: bindActionCreators(autoCompleteFunc, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);



// Load Components -> in useEffect we call Action (type: GET_MENTORS) -> 
// SAGA listen to Action (type: GET_MENTORS) and make request to backend then 
// send recieved data to new Action (type: RECIEVED_GET_MENTORS) 
// and save list of mentors in payload in  action
// Reducer listen to Action (type: RECIEVED_GET_MENTORS) and update state with new list of mentors
// Mentors component listen to store changes by (mapStateToProps) and connect function
// So Mentor component props are updated and component will rerender with new data