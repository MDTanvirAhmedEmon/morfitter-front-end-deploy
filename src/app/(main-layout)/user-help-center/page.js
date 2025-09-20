"use client";

import { Form, Input, Button, message, Card, ConfigProvider } from "antd";
import { useUserHelpCenterMutation } from "@/redux/features/profile/profileApi";

export default function UserHelpCenterPage() {
    const [form] = Form.useForm();
    const [userHelpCenter, { isLoading }] = useUserHelpCenterMutation();

    const onFinish = (values) => {
        const payload = {
            name: values.name,
            phone: values.phone,
            email: values.email,
            issue: values.issue
        };
        try {
            userHelpCenter(payload).unwrap();
            message.success("Message sent successfully");
            form.resetFields();
        } catch (err) {
            message.error(err?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="xxl:w-[1340px] mx-auto flex justify-center py-14 md:py-16">
            <Card title="Help Center" className="w-[600px]" styles={{ body: { paddingTop: 16 } }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark="optional"
                >
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input placeholder="Your Name" allowClear />
                    </Form.Item>

                    <Form.Item name="phone" label="Phone"
                        rules={[
                            { required: true, message: "Please enter your phone number" },
                            {
                                pattern: /^\+?[0-9]{8,15}$/,
                                message: "Phone number must be 8–15 digits and may start with +",
                            },
                        ]}>
                        <Input placeholder="Phone Number" allowClear />
                    </Form.Item>

                    <Form.Item name="email" label="email" rules={[{ required: true }, { type: "email" }]}>
                        <Input placeholder="Email Address" allowClear />
                    </Form.Item>

                    <Form.Item name="issue" label="Issue" rules={[{ required: true }]}>
                        <Input placeholder="Please describe the issue you are facing..." allowClear />
                    </Form.Item>

                    <Form.Item>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: { colorPrimary: "#0ba593", colorPrimaryHover: "#0ba593" },
                                },
                            }}
                        >
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                {isLoading ? "Loading..." : "Send"}
                            </Button>
                        </ConfigProvider>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
