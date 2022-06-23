import { Modal, Input, Button, DatePicker} from 'antd';
import {TeamOutlined} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createGroup, updateGroup } from '../../../store/actions/group.actions';
import { bindActionCreators } from 'redux';
const { RangePicker } = DatePicker;

function GroupModal({group, isModalVisible, handleCancel, loading, createGroupAction, updateGroupAction}){
    
    const [name, setName] = useState('');
    const [dates, setDates] = useState(null);
    const [hackValue, setHackValue] = useState(null);
    const [value, setValue] = useState(null);

    const handleOk = () => {
        if(!group) {
            const data = {
                name: name, 
                start: value[0]._d,
                end: value[1]._d
            };
            console.log(data.name);
            createGroupAction(data);
        } else {
            const data = {
                id: group.id,
                name: name,
                start: value[0]._d,
                end: value[1]._d,
            };
            // console.log('Looking for this');
            // console.log(value[0]._d);
            // console.log(typeof value[0]._d);
            // console.log('Whole this');
            // console.log(value);
            // console.log(typeof value);
            // console.log('Got this');
            // console.log(group.start);
            // console.log(typeof group.start);
            updateGroupAction(data);
        }
    };
    
    const onChangeName = (e) => {
        setName(e.target.value);
    }

    useEffect(() => {
        if(group)
        {
            setName(group.name);
            setValue([]);
        }
    }, [group]);

    useEffect(()=>{
        if(!loading){
            setName('');
            setValue(null);
            handleCancel();
        }
    }, [loading]);
  
    const onOpenChange = (open) => {
      if (open) {
        setHackValue([null, null]);
        setDates([null, null]);
      } else {
        setHackValue(null);
      }
    };

    return (
        <Modal 
            title="Добавление группы"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                Отмена
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                Сохранить
                </Button>,
             ]}>
            
            <Input size='large' placeholder='Введите имя группы' value={name} onChange={onChangeName} prefix={<TeamOutlined />}/>
            <RangePicker
                value={hackValue || value}
                onCalendarChange={(val) => setDates(val)}
                onChange={(val) => setValue(val)}
                onOpenChange={onOpenChange}
                placeholder={['Дата начала', 'Дата конца']}
            />
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => ({
    createGroupAction: bindActionCreators(createGroup, dispatch),
    updateGroupAction: bindActionCreators(updateGroup, dispatch)
});

const mapStateToProps = (state) => ({
    loading: state.groupReducers.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupModal);