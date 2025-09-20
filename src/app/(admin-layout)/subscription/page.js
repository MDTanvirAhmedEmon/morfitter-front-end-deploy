"use client";
import { useGetSubscriptionQuery } from "@/redux/features/admin/settings/TermsApi";
import { Pagination, Spin, Table } from "antd";
import { useState } from "react";

const Subscription = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const { data, isLoading } = useGetSubscriptionQuery({ page: currentPage, limit: 10, searchQuery });

    const columns = [
        {
            title: "Index",
            render: (_text, _record, index) => (currentPage - 1) * 10 + index + 1,
        },
        {
            title: "Email",
            dataIndex: "email",
        }
    ];

    if (isLoading) {
        return (
            <div className=" h-[40vh] flex justify-center items-center">
                <Spin size="large"></Spin>
            </div>
        );
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="p-5 flex flex-col md:flex-row md:justify-between md:items-center mb-5">
                <h1 className="text-3xl font-bold mb-5">Subscriptions</h1>
                <div>
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="border border-[#0ba593] py-3 pl-4 pr-[65px] outline-none w-full rounded-md"
                        />
                    </div>
                </div>
            </div>
            <Table
                pagination={false}
                columns={columns}
                dataSource={data?.data?.Subscriptions || []}
            />
            <div className="mt-6">
                {data?.data?.Subscriptions !== 0 && (
                    <Pagination
                        current={currentPage}
                        pageSize={10}
                        total={data?.data?.total}
                        onChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default Subscription;
