"use client";
import { useGenerateOAuthMutation } from "@/redux/features/session/sessionApi";
import { message, Modal } from "antd";
import { useState } from "react";

const ConnectStripeModal = ({ isModalOpen, handleCancel, handleOk, trainerId }) => {
    const [email, setEmail] = useState(null);
    const [generateOAuth, { isLoading }] = useGenerateOAuthMutation();


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleConnectClick = () => {
        console.log("Email entered:", email);
        if (!email) {
            message.error("Please enter email");
            return;
        }
        generateOAuth({ trainerId: trainerId, email: email }).unwrap()
            .then((data) => {
                window.location.href = data?.data;
            })
            .catch((error) => {
                console.log(error);
                message.error(error?.data?.message || "Something went wrong!");
            })
    };

    return (
        <Modal
            className="rounded-lg shadow-xl"
            footer={false}
            centered
            open={isModalOpen}
            onOk={handleOk}
            // onCancel={handleCancel}
            header={null}
            closeIcon={null}

        >
            <div className="pt-6 px-4">
                <div className="mb-6">
                    <p className="text-gray-600 text-lg font-medium">
                        To start receiving payments, connect your Stripe account.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Click below to securely connect and manage payments through Stripe.
                    </p>
                </div>

                {/* Email input field */}
                <div className="mb-4">
                    <p className="text-gray-600 mb-2">
                        Please enter the email address associated with your Stripe account. This will be used to connect your Stripe account for processing payments.
                    </p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full rounded-lg shadow-sm border border-[#6772e5] focus:outline-none focus:ring-1 focus:ring-[#6772e5] p-3"
                    />

                </div>

                <div className="text-center">
                    {/* {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin border-4 border-t-4 border-gray-500 rounded-full w-12 h-12"></div>
                    </div>
                ) : ( */}
                    <button
                        onClick={handleConnectClick}
                        disabled={isLoading}
                        className="bg-[#6772e5] text-white text-lg font-semibold py-2 px-6 rounded-lg hover:bg-[#6470ee] focus:outline-none focus:ring-2 focus:ring-[#6470ee] w-full"
                    >
                        {isLoading ? "Loading..." : "Connect to Stripe"}
                    </button>
                    {/* )} */}
                </div>
            </div>
        </Modal>
    );
};

export default ConnectStripeModal;
