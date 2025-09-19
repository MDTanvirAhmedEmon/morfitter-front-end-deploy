"use client"

import { usePrivacySettingsQuery } from "@/redux/features/auth/authApi";

function PrivacySettings() {
    const { data } = usePrivacySettingsQuery();
    console.log(data?.data?.[0]?.policy);

    return (
        <div className="xxl:w-[1340px] mx-auto py-8 md:py-14 min-h-[80vh]">
            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight mb-6">
                Privacy Settings
            </h1>

            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data?.data?.[0]?.policy ?? "" }}
            />
        </div>
    );
}

export default PrivacySettings;
