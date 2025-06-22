"use client"

import { Form, Input, DatePicker, Button, Card, Space, message } from "antd"
import { useEffect } from "react"
import { HiLink, HiHashtag, HiLockClosed, HiClock, HiCalendar } from "react-icons/hi2"
import dayjs from "dayjs"
import { useUpdateSessionMutation } from "@/redux/features/session/sessionApi"

const OnlineSessionContent = ({ sessionInfo }) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (sessionInfo) {
            form.setFieldsValue({
                zoomLink: sessionInfo.zoomLink || "",
                meetingId: sessionInfo.meetingId || "",
                passcode: sessionInfo.passcode || "",
                startTime: sessionInfo.startTime ? dayjs(sessionInfo.startTime) : null,
                druration: sessionInfo.druration || "", // consider fixing typo: "duration"
            })
        }
    }, [sessionInfo, form])

    const [updateSession, { isLoading }] = useUpdateSessionMutation();

    const onFinish = (values) => {
        console.log("Form values:", values)

        const formData = new FormData();
        formData.append("data", JSON.stringify(values));
        updateSession({ id: sessionInfo?._id, formData })
            .unwrap()
            .then(() => {
                message.success(`Session updated Successfully`);
            })
            .catch((error) => {
                message.error(error?.data?.message);
            });
    }

    return (
        <div className="bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Card className="shadow-lg">
                    <div className="text-center mb-8">
                        <h1 className="text-primary mb-2 text-xl">Next Online Session Information</h1>
                        <p className="text-gray-600">Please fill in the meeting details below</p>
                    </div>

                    <Form
                        form={form}
                        name="zoom-meeting"
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                        size="large"
                    >
                        <Form.Item
                            label="Zoom Link"
                            name="zoomLink"
                            rules={[
                                {
                                    type: "url",
                                    message: "Please enter a valid URL",
                                },
                            ]}
                        >
                            <Input
                                prefix={<HiLink className="text-primary mr-1" />}
                                placeholder="https://zoom.us/j/..."
                                className="rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item label="Meeting ID" name="meetingId">
                            <Input
                                prefix={<HiHashtag className="text-primary mr-1" />}
                                placeholder="123 456 7890"
                                className="rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item label="Passcode" name="passcode">
                            <Input.Password
                                prefix={<HiLockClosed className="text-primary mr-1" />}
                                placeholder="Enter meeting passcode"
                                className="rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item label="Start Time" name="startTime">
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm"
                                placeholder="Select date and time"
                                className="w-full rounded-lg"
                                suffixIcon={<HiCalendar className="text-primary" />}
                            />
                        </Form.Item>

                        <Form.Item label="Duration" name="druration">
                            <Input
                                prefix={<HiClock className="text-primary mr-1" />}
                                placeholder="e.g., 1 hour, 30 minutes"
                                className="rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item className="mb-0 pt-4">
                            <Space className="w-full justify-center">
                                <Button
                                    type="default"
                                    size="large"
                                    onClick={() => form.resetFields()}
                                    className="min-w-[120px] rounded-lg"
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={isLoading}
                                    loading={isLoading}
                                    size="large"
                                    className="min-w-[120px] rounded-lg bg-primary hover:bg-primary/90"
                                >
                                    Submit
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default OnlineSessionContent;