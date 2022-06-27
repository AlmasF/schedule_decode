import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createMentor, updateMentor } from '../../../store/actions/mentor.actions';
import { getActiveGroups } from '../../../store/actions/group.actions';
import { Modal, Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import { bindActionCreators } from 'redux';

function LessonModal({isModalVisible, handleCancel, loading, getActiveGroupsAction}){
    const [name, setName] = useState('');

    const handleOk = () => {
        
    };
    
    const onChange = (e) => {
        setName(e.target.value)
    }

    useEffect(()=>{
        if(!loading){
            setName('');
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
            <Input size='large' placeholder='Введите имя ментора' value={name} onChange={onChange} prefix={<UserOutlined />}/>
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => ({
    createMentorAction: bindActionCreators(createMentor, dispatch),
    updateMentorAction: bindActionCreators(updateMentor, dispatch),
    getActiveGroupsAction: bindActionCreators(getActiveGroups, dispatch)
});

const mapStateToProps = (state) => ({
    loading: state.mentorReducers.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonModal);