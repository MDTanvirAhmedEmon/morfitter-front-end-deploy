"use client";
import Image from "next/image";
// import follower from '../../assets/content/follwing2.png'
import Calisthenics from "../../assets/content/colle.svg";
// import Post1 from '../../assets/content/post1.png'
import { useState } from "react";
import ShareModal from "./ShareModal";
import BlogComments from "./BlogComments";
import {
  useGetAllCommentsQuery,
  useLikeAndDislikeMutation,
} from "@/redux/features/content/contentApi";
import { useSelector } from "react-redux";
import profileImage from "../../assets/profile/profile_image.webp";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SingleBlogForLogOut = ({ content }) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const date = new Date(content?.createdAt);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="px-3 mx-0 py-5">
      <div className=" px-3 md:px-5 py-10 border border-gray-300 shadow-[0px_0px_19px_0px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col md:flex-row gap-5 ">
        {/* Post Details Section */}
        <div className=" w-full">
          <div className=" flex flex-col md:flex-row justify-between gap-4 md:gap-8">
            <div className=" flex items-center gap-8">
              <Image
                src={
                  content?.userInfo?.profileImageUrl
                    ? `https://api.morfitter.com${content?.userInfo?.profileImageUrl}`
                    : profileImage
                }
                width={200}
                height={200}
                alt="user"
                className="w-28 h-24 rounded-lg object-cover "
              />

              <div className="">
                <span className="text-lg md:text-xl capitalize font-semibold cursor-pointer">
                  {content?.userInfo?.firstName} {content?.userInfo?.lastName}
                </span>
                <div className="flex items-center mt-1 gap-1">
                  <Image
                    src={Calisthenics}
                    width={0}
                    height={0}
                    alt="Calisthenics"
                  />
                  <span className=" text-xl md:text-2xl text-secondary">
                    {content?.specialism}
                  </span>
                </div>
              </div>
            </div>
            {/* Header Section */}
            <div className=" md:pt-3 flex justify-end">
              <div className="date text-lg">
                <p>{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className=" mt-3 md:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl w-full overflow-hidden">
              {content?.imageUrl && (
                <Image
                  src={`https://api.morfitter.com${content?.imageUrl}`}
                  alt="Post Content"
                  width={500}
                  height={500}
                  className="w-full h-[200px] md:h-[450px] object-cover"
                />
              )}

              {content?.videoUrl && (
                <video controls className="w-full rounded-lg ">
                  <source
                    src={`https://api.morfitter.com${content?.videoUrl}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Description Part */}
            <div className="border border-gray-300 p-5 rounded-lg">
              <div className=" hidden md:block text-xl md:text-2xl font-semibold">
                {content?.title}
              </div>
              <div className="md:text-xl font-normal md:mt-5 text-gray-600 leading-7 tracking-wide">
                {content?.content}
              </div>
            </div>
          </div>

          {/* Button Section */}
          <div className="btn-part flex gap-3 md:gap-12 items-center mt-6">
            <Link href={`/auth/login`}>
              <button
                className={`btn-item like px-4 md:px-2 flex gap-2 justify-center items-center  md:w-40 h-11 rounded-lg bg-[#0ba59313] border text-greenColor border-greenColor ${content?.isLiked ? "shadow shadow-greenColor" : ""
                  }  `}
              >
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 12.4071V22.3118C0 23.6799 1.1635 24.762 2.6 24.762H5.19997V9.90494H2.6C1.1635 9.90494 0 11.039 0 12.4071ZM25.9076 14.0587L23.6482 22.1496C23.2764 23.6861 21.8399 24.762 20.1837 24.762H7.79997V9.93093L10.0347 2.26096C10.2986 0.630392 12.0769 -0.464088 13.8787 0.194576C14.9564 0.589527 15.5999 1.65798 15.5999 2.75864V8.69284C15.5999 9.37627 16.1823 9.90494 16.8999 9.90494H22.4431C24.7298 9.90494 26.4211 11.9379 25.9076 14.0587Z"
                    fill="#0BA593"
                  />
                </svg>
                <span className=" hidden md:block">
                  Like {content?.totalLikes}
                </span>
                <span className=" block md:hidden">{content?.totalLikes}</span>
              </button>
            </Link>
            <Link href={`/auth/login`}>
              <button className="btn-item comment px-4 md:px-2 flex gap-2 justify-center items-center shadow-md md:w-40 h-11 rounded-lg bg-red-50 border border-red-600 text-red-600">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.6875 10.5625H7.3125C6.864 10.5625 6.5 10.1993 6.5 9.75C6.5 9.3015 6.864 8.9375 7.3125 8.9375H18.6875C19.136 8.9375 19.5 9.3015 19.5 9.75C19.5 10.1993 19.136 10.5625 18.6875 10.5625ZM17.0625 15.4375H8.9375C8.489 15.4375 8.125 15.0743 8.125 14.625C8.125 14.1757 8.489 13.8125 8.9375 13.8125H17.0625C17.511 13.8125 17.875 14.1757 17.875 14.625C17.875 15.0743 17.511 15.4375 17.0625 15.4375ZM13 0C5.82075 0 0 5.09356 0 11.375C0 14.9654 1.90531 18.1626 4.875 20.2467V26L10.5698 22.5444C11.3579 22.6744 12.1688 22.75 13 22.75C20.1793 22.75 26 17.6572 26 11.375C26 5.09356 20.1793 0 13 0Z"
                    fill="#E26972"
                  />
                </svg>
                <span className=" hidden md:block">Comment </span>
              </button>
            </Link>
            <Link href={`/auth/login`}>
              <button
                onClick={showModal}
                className="btn-item share flex px-4 md:px-2 gap-2 justify-center items-center shadow-md md:w-40 h-11 rounded-lg bg-[#572c5725] border border-secondary text-secondary"
              >
                <svg
                  width="23"
                  height="26"
                  viewBox="0 0 23 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.9394 4.33333C13.9394 1.94009 15.9677 0 18.4697 0C20.9717 0 23 1.94009 23 4.33333C23 6.72656 20.9717 8.66667 18.4697 8.66667C17.2063 8.66667 16.0646 8.17175 15.2437 7.37551L8.9723 11.4783C9.0302 11.7552 9.06065 12.0412 9.06065 12.3334C9.06065 12.9119 8.94159 13.4649 8.72591 13.9703L15.6025 18.3115C16.383 17.7009 17.3816 17.3333 18.4697 17.3333C20.9717 17.3333 23 19.2734 23 21.6667C23 24.0599 20.9717 26 18.4697 26C15.9677 26 13.9394 24.0599 13.9394 21.6667C13.9394 21.0399 14.079 20.4431 14.3299 19.9044L7.50892 15.5983C6.71324 16.2627 5.67099 16.6667 4.5303 16.6667C2.02829 16.6667 0 14.7265 0 12.3334C0 9.9401 2.02829 8 4.5303 8C5.96904 8 7.24978 8.64143 8.07902 9.63973L15.4433 6.20174C15.4858 5.92906 15.4697 5.64486 15.4697 5.33333C15.4697 4.75583 14.9255 4.33333 13.9394 4.33333Z"
                    fill="#572c57"
                  />
                </svg>
                <span className=" hidden md:block">Share</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogForLogOut;
