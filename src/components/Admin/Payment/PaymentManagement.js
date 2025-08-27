"use client";
import {
    useGetallUserManagementQuery,
    useUpdateUserMutation,
} from "@/redux/features/admin/userManagement/userManagementApi";
import { Avatar, message, Pagination, Spin, Table } from "antd";
import { useState } from "react";

const PaymentManagement = ({ searchQuery }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: getallUserManagementData, isLoading } =
        useGetallUserManagementQuery({
            page: currentPage,
            searchTerm: searchQuery,
        });
    console.log(getallUserManagementData?.data?.data);
    const [updateUser] = useUpdateUserMutation();

    // console.log(getallUserManagementData?.data);

    const confirm = (id) => {
        updateUser(id)
            .unwrap()
            .then(() => {
                message.success("Status Changed Successfully");
            })
            .catch((error) => {
                message.error(error?.data?.message);
            });
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "userData",
            key: "image",
            render: (_, record) =>
                record?.profileImageUrl ? (
                    <Avatar
                        size={40}
                        src={`https://api.morfitter.com${record?.profileImageUrl}`}
                    />
                ) : (
                    <Avatar size={40} src="https://avatar.iran.liara.run/public/43" />
                ),
        },
        {
            title: "Name",
            dataIndex: "firstName",
            key: "name",
            render: (_, record) => (
                <p>{`${record?.firstName} ${record?.lastName}`}</p>
            ),
        },
        {
            title: "Amount",
            dataIndex: "contactNo",
            render: (_, record) => <p>£100</p>,
        },
        {
            title: "Email",
            dataIndex: "userData",
            key: "email",
            render: (_, record) => record?.userData?.email,
        },
        {
            title: "Contact No",
            dataIndex: "contactNo",
            render: (_, record) => record?.contactNo,
        },
        {
            title: "Trainer Name",
            dataIndex: "contactNo",
            render: (_, record) => <p>Trainer Name</p>,
        },
        {
            title: "Trainer Amount",
            dataIndex: "contactNo",
            render: (_, record) => <p>£90</p>,
        },
        {
            title: "Admin Amount",
            dataIndex: "contactNo",
            render: (_, record) => <p>£10</p>,
        },
        {
            title: "Payment Status",
            dataIndex: "userData",
            key: "status",
            render: (_, record) => (
                <button
                    className={`cursor-default px-2 py-1 rounded-md ${record?.userData?.status === "paid"
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                        }`}
                >
                    {record?.userData?.status || "N/A"}
                </button>
            ),
        },
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
                dataSource={getallUserManagementData?.data?.data || []}
            />
            <div className="mt-6">
                {getallUserManagementData?.data?.data?.length !== 0 && (
                    <Pagination
                        current={getallUserManagementData?.data?.meta?.page}
                        pageSize={getallUserManagementData?.data?.meta?.limit}
                        total={getallUserManagementData?.data?.meta?.total}
                        onChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default PaymentManagement;
