"use client";

import React, { useEffect, useMemo } from "react";
import { Form, Input, Button, message, Card, ConfigProvider } from "antd";
import {
    useCreateUpdateSocialMutation,
    useGetSocialLinksQuery,
} from "@/redux/features/admin/session/adminSessionApi";

export default function SocialLinks() {
    const [form] = Form.useForm();
    const { data, isFetching, isLoading: isLoadingGet } = useGetSocialLinksQuery();
    const [createUpdateSocial, { isLoading }] = useCreateUpdateSocialMutation();

    // Safely pick the first record and coerce to strings
    const defaults = useMemo(() => {
        const rec = data?.data?.[0] ?? {};
        return {
            facebook: String(rec?.facebook ?? ""),
            instagram: String(rec?.instagram ?? ""),
            x: String(rec?.x ?? ""),
            linkedin: String(rec?.linkedin ?? ""),
        };
    }, [data]);

    // Hydrate form when data arrives/changes
    useEffect(() => {
        form.setFieldsValue(defaults);
    }, [defaults, form]);

    const onFinish = (values) => {
        const payload = {
            facebook: values.facebook,
            instagram: values.instagram,
            x: values.x,
            linkedin: values.linkedin,
        };

        try {
            createUpdateSocial(payload).unwrap();
            message.success("Social links saved.");
        } catch (err) {
            message.error(err?.data?.message || "Failed to save social links.");
        }
    };

    return (
        <Card title="Social Links" className="max-w-2xl" styles={{ body: { paddingTop: 16 } }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                validateTrigger={["onBlur", "onSubmit"]}
                requiredMark="optional"
                initialValues={{ facebook: "", instagram: "", x: "", linkedin: "" }} // used only on first mount
            >
                <Form.Item name="facebook" label="Facebook" rules={[{ required: true }, { type: "url" }]}>
                    <Input placeholder="https://facebook.com/yourpage" allowClear />
                </Form.Item>

                <Form.Item name="instagram" label="Instagram" rules={[{ required: true }, { type: "url" }]}>
                    <Input placeholder="https://instagram.com/yourhandle" allowClear />
                </Form.Item>

                <Form.Item name="x" label="X (Twitter)" rules={[{ required: true }, { type: "url" }]}>
                    <Input placeholder="https://x.com/yourhandle" allowClear />
                </Form.Item>

                <Form.Item name="linkedin" label="LinkedIn" rules={[{ required: true }, { type: "url" }]}>
                    <Input placeholder="https://linkedin.com/in/yourprofile" allowClear />
                </Form.Item>

                <Form.Item>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: { colorPrimary: "#0ba593", colorPrimaryHover: "#0ba593" },
                            },
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={isLoading || isFetching || isLoadingGet}>
                            {isLoading || isFetching || isLoadingGet ? "Loading..." : "Save"}
                        </Button>
                    </ConfigProvider>
                </Form.Item>
            </Form>
        </Card>
    );
}
