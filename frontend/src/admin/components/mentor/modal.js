import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createMentor, updateMentor } from '../../../store/actions/mentor.actions';
import { Modal, Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import { bindActionCreators } from 'redux';

function MentorModal({mentor, isModalVisible, handleCancel, loading, createMentorAction, updateMentorAction}){
    const [name, setName] = useState('');

    const handleOk = () => {
        if(!mentor) createMentorAction(name);
        else updateMentorAction({id: mentor.id, name});
    };
    
    const onChange = (e) => {
        setName(e.target.value)
    }

    useEffect(() => {
        if(mentor){
            setName(mentor.full_name)
        } else {
            setName('');
        }
            
    }, [mentor])

    useEffect(()=>{
        if(!loading){
            setName('');
            handleCancel();
        }
    }, [loading])


    return (
        <Modal 
            title="Добавление ментора"
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
    updateMentorAction: bindActionCreators(updateMentor, dispatch)
});

const mapStateToProps = (state) => ({
    loading: state.mentorReducers.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(MentorModal);