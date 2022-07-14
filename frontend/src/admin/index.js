import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    BarsOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;


function Admin(){
    let navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const onSelect = ({key}) => {
      // console.log(key);
      navigate(`/admin/${key}`);
    }
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onSelect={onSelect}
            items={[
              {
                key: 'mentors',
                icon: <UserOutlined />,
                label: 'Mentors',
              },
              {
                key: 'groups',
                icon: <TeamOutlined />,
                label: 'Groups',
              },
              {
                key: 'lesson_in_week',
                icon: <BarsOutlined />,
                label: 'Lessons'
              }
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
            >
              <Outlet/>
          </Content>
        </Layout>
      </Layout>
    );
}

export default Admin;