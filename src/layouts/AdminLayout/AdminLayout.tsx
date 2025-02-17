import {
  BarcodeOutlined,
  CarOutlined,
  FlagFilled,
  LogoutOutlined,
} from '@ant-design/icons';
import { Card, Col, Layout, Menu, MenuProps, Row, Spin } from 'antd';
import { useRouter } from 'next/router';
import { createElement, PropsWithChildren, useState } from 'react';

import { useAdminGetGarages, useAdminGetUsers, useGetTotalIncome } from '@/api';
import { useAuthStore } from '@/context';
import { UserEditIcon } from '@/icons';

const { Header, Content, Sider } = Layout;

export function AdminLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const [, dispatch] = useAuthStore();

  const items: MenuProps['items'] = [
    {
      key: '/admin/users',
      label: 'Quản lý người dùng',
      icon: createElement(UserEditIcon),
      onClick: () => router.push('/admin/users'),
    },
    {
      key: '/admin/garages',
      label: 'Quản lý garages',
      icon: createElement(CarOutlined),
      onClick: () => router.push('/admin/garages'),
    },
    {
      key: '/admin/waiting-garages',
      label: 'Garages cần duyệt',
      icon: createElement(CarOutlined),
      onClick: () => router.push('/admin/waiting-garages'),
    },
    {
      key: '/admin/subscriptions',
      label: 'Quản lí giao dịch',
      icon: createElement(BarcodeOutlined),
      onClick: () => router.push('/admin/subscriptions'),
    },
    {
      key: '/admin/reports',
      label: 'Quản lý báo cáo',
      icon: createElement(FlagFilled),
      onClick: () => router.push('/admin/reports'),
    },
    {
      key: 'log-out',
      label: <span>Đăng xuất</span>,
      icon: createElement(LogoutOutlined),
      danger: true,
      onClick: () => {
        dispatch({ type: 'SIGN_OUT' });
        router.push('/');
      },
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  const { data: garages, isLoading: fetchingGarages } = useAdminGetGarages({
    queryKey: 'admin-layout-users',
    variables: { body: {} },
  });
  const { data: users, isLoading: fetchingUsers } = useAdminGetUsers({
    queryKey: 'admin-layout-garages',
    variables: { body: {} },
  });

  const { data: totalIncome } = useGetTotalIncome();

  return (
    <Layout hasSider>
      <Sider
        className="overflow-auto h-screen fixed left-0 top-0 bottom-0 bg-white pt-28 shadow-md"
        width={300}
        collapsedWidth={80}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items}
          selectedKeys={[router.pathname]}
        />
      </Sider>
      <Layout
        className="transition-all ease-in-out min-h-screen"
        style={{ marginLeft: collapsed ? 80 : 300 }}
      >
        <Header className="p-0 bg-white sticky top-0 z-10 w-full shadow-md" />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Spin spinning={fetchingGarages || fetchingUsers}>
            <Row gutter={16} className="mb-10">
              <Col span={8}>
                <Card
                  bordered={false}
                  className="flex flex-col gap-4 items-center"
                >
                  <div className="text-4xl font-bold text-center">
                    {users?.length ?? 0}
                  </div>
                  <div>Users</div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  bordered={false}
                  className="flex flex-col gap-4 items-center"
                >
                  <div className="text-4xl font-bold text-center">
                    {garages?.length ?? 0}
                  </div>
                  <div>Garages</div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  bordered={false}
                  className="flex flex-col gap-4 items-center"
                >
                  <div className="text-4xl font-bold text-center">
                    {totalIncome}
                  </div>
                  <div>Revenue generated</div>
                </Card>
              </Col>
            </Row>
          </Spin>
          <div className="p-4 bg-white rounded-md shadow">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
