"use client"

import { useTrustAndSafetyQuery } from "@/redux/features/auth/authApi";

function TrustAndSafety() {
    const { data } = useTrustAndSafetyQuery();
    console.log(data?.data?.[0]?.term);

    return (
        <div className="xxl:w-[1340px] mx-auto py-8 md:py-14 min-h-[80vh]">
            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight mb-6">
                Trust And Safety
            </h1>

            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data?.data?.[0]?.term ?? "" }}
            />
        </div>
    );
}

export default TrustAndSafety;
