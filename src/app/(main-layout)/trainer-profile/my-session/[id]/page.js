"use client";
import AddSessionContentModal from "@/components/TrainerProfile/AddSessionContentModal";
import { useDeletSessionVideoMutation, useDeletWholeSessionMutation, useGetSingleSessionQuery, useGetTotalEntrolledUserSessionQuery } from "@/redux/features/session/sessionApi";
import { message, Popconfirm } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import profileImage from "../../../../../assets/profile/profile_image.webp";
import { CiEdit } from "react-icons/ci";
import EditSessionModal from "@/components/TrainerProfile/EditSessionModal";
import OnlineSessionContent from "@/components/TrainerProfile/OnlineSessionContent";

const BASE_URL = "https://api.morfitter.com";

const SingleSession = () => {
    const { id } = useParams();

    const router = useRouter();
    const { data } = useGetSingleSessionQuery(id);
    console.log('session data', data);
    const session = data?.data;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // Edit Modal
    const showEditModal = () => {
        setIsEditModalOpen(true);
    };
    const handleEditOk = () => {
        setIsEditModalOpen(false);
    };
    const handleEditCancel = () => {
        setIsEditModalOpen(false);
    };
    const { data: allEntrolledUser } = useGetTotalEntrolledUserSessionQuery(id);

    const [deletSessionVideo] = useDeletSessionVideoMutation();
    const [deletWholeSession, { isLoading }] = useDeletWholeSessionMutation();
    const confirm = (content) => {
        const data = {
            sessionId: id,
            contentId: content?._id
        }
        deletSessionVideo(data).unwrap()
            .then(() => {
                message.success('Deleted Successfully')
            })
            .catch((error) => {
                message.error(error?.data?.message)
            })
    };

    const handleDeleteSession = () => {
        deletWholeSession(id).unwrap()
            .then(() => {
                message.success('Session deleted successfully')
                router.push(`/trainer-profile`)
            })
            .catch((error) => {
                message.error(error?.data?.message)
            })
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="xxl:w-[1340px] mx-auto px-3 py-12 space-y-10">

                <div className="flex flex-col md:flex-row gap-6 ">

                    {session?.promo_video && (
                        <div className="w-full md:w-[60%]">
                            <h2 className="text-xl font-semibold mb-3">Promo Video</h2>
                            <video controls className="w-full h-[400px] object-cover rounded-lg shadow-md" src={`${BASE_URL}${session.promo_video}`}>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}

                    {session?.promo_image && (
                        <div className="w-full md:w-[40%]">
                            <h2 className="text-xl font-semibold mb-3">Promo Image</h2>
                            <Image
                                src={`${BASE_URL}${session.promo_image}`}
                                width={500}
                                height={300}
                                alt="Promo Image"
                                className="w-full h-auto lg:h-[400px] object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                    <h1 className="text-4xl font-semibold text-gray-900 mb-2">{session?.title}</h1>
                    <p className="mb-6">{session?.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                        <div>
                            <span className="block text-sm font-medium text-gray-500">Session Type</span>
                            <p className="text-lg font-semibold">{session?.sessionType}</p>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-500">Fitness Focus</span>
                            <p className="text-lg font-semibold">{session?.fitnessFocus}</p>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-500">Access Type</span>
                            <p className="text-lg font-semibold">{session?.accessType}</p>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-500">Frequency</span>
                            <p className="text-lg font-semibold">{session?.frequency}</p>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-gray-500">Membership Fee</span>
                            <p className="text-lg font-semibold">${session?.membership_fee ? session?.membership_fee : 0}</p>
                        </div>
                    </div>
                </div>



                <div>
                    <CiEdit onClick={showEditModal} className=" w-8 h-8 cursor-pointer" />
                </div>
                <EditSessionModal isEditModalOpen={isEditModalOpen} handleEditOk={handleEditOk} handleEditCancel={handleEditCancel} session={session}></EditSessionModal>
                <AddSessionContentModal isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} id={id}></AddSessionContentModal>

                {
                    session?.sessionType === "recorded" ?
                        <div>
                            <div className=" flex justify-between items-center mb-5">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recorded Content</h2>
                                <button className=" bg-secondary text-white px-4 py-2 rounded-md" onClick={showModal}>Add Content</button>
                            </div>


                            {session?.recordedContent.length > 0 && (
                                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                                    {session.recordedContent.map((content, index) => (
                                        <div key={content._id} className="border py-4 px-3 rounded-lg shadow-md bg-gray-50">
                                            <div className=" flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-teal-600">{index + 1}. {content.title}</h3>
                                                    <p className="text-gray-600">⏳ Duration: {content.duration}</p>
                                                </div>
                                                <Popconfirm
                                                    title="Delete the video"
                                                    description="Are you sure to delete this video?"
                                                    onConfirm={() => confirm(content)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <button className=" bg-red-600 px-2 py-1 text-white rounded">Delete</button>
                                                </Popconfirm>

                                            </div>


                                            <video controls className="w-full mt-3 rounded-lg" src={`${BASE_URL}${content.url}`}>
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        :
                        <div>
                            <OnlineSessionContent sessionInfo={session}></OnlineSessionContent>
                        </div>
                }

                <div className=" bg-gray-50 py-10 ">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                        Enrolled Users
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
                        {allEntrolledUser?.data?.map((user) => (
                            <div
                                key={user?._id}
                                className="bg-white shadow-lg flex items-center rounded-lg py-4 px-3 "
                            >

                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={user?.additionalInfo?.profileImageUrl
                                            ? `https://api.morfitter.com${user?.additionalInfo?.profileImageUrl}`
                                            : profileImage}
                                        alt="Profile"
                                        width={300}
                                        height={300}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                                    />
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 capitalize">
                                            <Link href={`/view-user-profile/?trainee=${user?.additionalInfo?._id}&userId=${user?.user_id}`}> {user?.additionalInfo?.firstName} {user?.additionalInfo?.lastName}</Link>
                                        </h2>
                                        <p className="text-sm text-gray-600 capitalize">{user?.additionalInfo?.country}</p>
                                    </div>
                                </div>


                                <div className="mt-4 flex space-x-3">
                                    {user?.additionalInfo?.Facebook && (
                                        <Link
                                            href={user?.additionalInfo?.Facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            <i className="fab fa-twitter text-xl">Facebook</i>
                                        </Link>
                                    )}
                                    {user?.additionalInfo?.Instagram && (
                                        <Link
                                            href={user?.additionalInfo?.Instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-500 hover:text-pink-600"
                                        >
                                            <i className="fab fa-instagram text-xl">Instagram</i>
                                        </Link>
                                    )}
                                    {user?.additionalInfo?.Youtube && (
                                        <Link
                                            href={user?.additionalInfo?.Youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <i className="fab fa-youtube text-xl">Youtube</i>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=" flex justify-end">
                    <Popconfirm
                        title="Delete the session"
                        description="Are you sure to delete this session?"
                        onConfirm={handleDeleteSession}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className=" bg-red-600 px-2 py-1 text-white rounded">Delete Whole Session</button>
                    </Popconfirm>
                </div>

            </div>
        </div>
    );
};

export default SingleSession;