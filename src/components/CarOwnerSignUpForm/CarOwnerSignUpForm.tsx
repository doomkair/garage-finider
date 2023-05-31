import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Typography } from 'antd';

import { usePostRegister } from '@/api/post';
import { useAuthStore } from '@/contexts/auth.store';

type CarOwnerSignUpFormValues = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
};

export function CarOwnerSignUpForm() {
  const [form] = Form.useForm<CarOwnerSignUpFormValues>();

  const { recall } = usePostRegister();
  const updateUser = useAuthStore.use.update();

  const onFinish = (values: CarOwnerSignUpFormValues) => {
    const { email, fullName, password, phone } = values;

    console.log('ok');

    recall({
      variables: {
        name: fullName,
        emailAddress: email,
        password,
        phoneNumber: phone,
        roleID: 0,
      },
      onCompleted: (data) => {
        console.log(data);
        updateUser({ email, fullName, phone });
      },
      onError: (error) => {
        console.error(error);
        message.error(String(error));
      },
    });
  };

  return (
    <Form form={form} className="max-w-md w-full" onFinish={onFinish}>
      <Typography.Title className="mb-14" level={2}>
        Đăng ký
      </Typography.Title>

      <Form.Item name="fullName">
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Họ tên"
          suffix={<UserOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="phone">
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Số điện thoại"
          suffix={<PhoneOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="email">
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Email"
          suffix={<MailOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="password">
        <Input.Password
          size="large"
          className="rounded-full shadow-md"
          placeholder="Mật khẩu"
        />
      </Form.Item>

      <Form.Item name="retypePassword">
        <Input.Password
          size="large"
          className="rounded-full shadow-md"
          placeholder="Nhập lại mật khẩu"
        />
      </Form.Item>

      <Form.Item className="mt-14">
        <Button
          className="w-full rounded-full shadow-md"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Đăng Ký
        </Button>
      </Form.Item>
    </Form>
  );
}
