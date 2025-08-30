"use client";
import { useGetAllPaymentsQuery } from "@/redux/features/admin/payments/paymentApi";
import { Avatar, Pagination, Spin, Table } from "antd";
import { useState } from "react";

const PaymentManagement = ({ searchQuery }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: allpayments, isLoading } =
        useGetAllPaymentsQuery({
            page: currentPage,
            searchTerm: searchQuery,
        });

    const columns = [
        {
            title: "Image",
            dataIndex: "userData",
            key: "image",
            render: (_, record) =>
                record?.buyer?.profileImageUrl ? (
                    <Avatar
                        size={40}
                        src={`https://api.morfitter.com${record?.buyer?.profileImageUrl}`}
                    />
                ) : (
                    <Avatar size={40} src="https://avatar.iran.liara.run/public/43" />
                ),
        },
        {
            title: "Trainee Name",
            dataIndex: "firstName",
            key: "name",
            render: (_, record) => (
                <p>{`${record?.buyer?.firstName} ${record?.buyer?.lastName}`}</p>
            ),
        },
        {
            title: "Price",
            dataIndex: "contactNo",
            render: (_, record) => <p>{record?.paymentStatus === "free" ? "free" : `£${record?.totalAmount}`}</p>,
        },
        // {
        //     title: "Email",
        //     dataIndex: "userData",
        //     key: "email",
        //     render: (_, record) => record?.userData?.email,
        // },
        {
            title: "Trainee Contact No",
            dataIndex: "contactNo",
            render: (_, record) => record?.buyer?.contactNo,
        },
        {
            title: "Trainer Name",
            dataIndex: "contactNo",
            render: (_, record) => <p>{`${record?.trainer?.firstName} ${record?.trainer?.lastName}`}</p>,
        },
        {
            title: "Trainer Amount",
            dataIndex: "contactNo",
            render: (_, record) => <p>{!record?.trainerAmount ? "free" : `£${record?.trainerAmount}`}</p>,
        },
        {
            title: "Platform Amount",
            dataIndex: "contactNo",
            render: (_, record) => <p>{!record?.platformAmount ? "free" : `£${record?.platformAmount}`}</p>,
        },
        {
            title: "Payment Status",
            dataIndex: "userData",
            key: "status",
            render: (_, record) => {
                if (record?.paymentStatus === "free") {
                    return (
                        <button className="cursor-default px-2 py-1 rounded-md bg-gray-400 text-white">
                            free
                        </button>
                    );
                }

                return (
                    <button
                        className={`cursor-default px-2 py-1 rounded-md ${record?.paymentStatus === "paid"
                                ? "bg-green-500 text-white"
                                : "bg-gray-400 text-white"
                            }`}
                    >
                        {record?.paymentStatus || "N/A"}
                    </button>
                );
            },
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
            <Table
                pagination={false}
                columns={columns}
                dataSource={allpayments?.data?.data || []}
            />
            <div className="mt-6">
                {allpayments?.data?.data?.length !== 0 && (
                    <Pagination
                        current={allpayments?.data?.meta?.page}
                        pageSize={allpayments?.data?.meta?.limit}
                        total={allpayments?.data?.meta?.total}
                        onChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default PaymentManagement;
