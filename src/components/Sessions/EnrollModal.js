"use client";
import {
  useCheckEnrollmentMutation,
  useEnrollSessionMutation,
} from "@/redux/features/session/sessionApi";
import { message, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MakePayment from "./MakePayment";

const EnrollModal = ({ isModalOpen, handleCancel, handleOk, session }) => {

  console.log(session);

  const { role } = useSelector((state) => state.auth);
  const router = useRouter();

  const [checkEnrollment, { data }] = useCheckEnrollmentMutation();

  const [enrollSession, { isLoading }] = useEnrollSessionMutation();

  useEffect(() => {
    if (session?._id && role?.id) {
      checkEnrollment({ session_id: session._id, user_id: role.id });
    }
  }, [checkEnrollment, role?.id, session]);

  const handleFreeEnroll = () => {
    const enrollData = {
      session_id: session?._id,
      user_id: role?.id,
      purchaseDate: new Date().toISOString(),
      paymentStatus: "free",
    };
    enrollSession(enrollData)
      .unwrap()
      .then(() => {
        message.success("Enrolled Successfully");
        handleOk();
        router.push(`/profile/my-enrolled-session`);
      })
      .catch((error) => {
        message.error(error?.data?.message);
      });
  };

  return (
    <Modal
      className=""
      footer={false}
      centered
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {session?.accessType === "free" &&
        (data?.data?.enrolled ? (
          <div className="pb-6 pt-10">
            <p className="text-lg text-center text-[#572c57] font-medium">
              ✅ You have already enrolled in this session.
            </p>
          </div>
        ) : (
          <div className="py-6 text-center">
            {session?.promo_video && (
              <div className="mt-4 mb-6 flex justify-center">
                <div className="relative w-full max-w-lg rounded-lg overflow-hidden shadow-xl bg-[#e0f7fa] p-1">
                  <video
                    controls
                    className="w-full rounded-lg transition-transform duration-300 hover:scale-105"
                  >
                    <source
                      src={`https://api.morfitter.com${session?.promo_video}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
            <p className=" mb-2">
              {session?.description}
            </p>

            <h1 className="text-2xl font-semibold text-[#572c57]">
              🎉 Free Session Available!
            </h1>
            <p className="text-[#323e4c] mt-2 text-sm">
              You can enroll in this session for free. No payment required!
            </p>

            <button
              onClick={handleFreeEnroll}
              className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-[#e26972] to-[#0ba593] text-white font-semibold text-lg shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Enroll For Free 🚀{" "}
              {isLoading && <span className="animate-spin">⏳</span>}
            </button>
          </div>
        ))}
      {/* for paid session. here membership means paid session */}
      {session?.accessType === "membership" && (
        <MakePayment session={session}></MakePayment>
      )}
    </Modal>
  );
};

export default EnrollModal;
