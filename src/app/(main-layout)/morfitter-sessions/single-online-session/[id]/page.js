"use client"

import {
    FaCalendarAlt,
    FaClock,
    FaUsers,
    FaVideo,
    FaMapMarkerAlt,
    FaUser,
    FaExternalLinkAlt,
    FaCopy,
    FaCheck,
    FaInfoCircle,
    FaRedoAlt,
} from "react-icons/fa"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation";
import { useCheckEnrollmentMutation, useGetSingleSessionQuery } from "@/redux/features/session/sessionApi";
import { useSelector } from "react-redux";

export default function JoinOnlineSessionPage() {
    const [copied, setCopied] = useState(false)
    const { role } = useSelector((state) => state.auth);
    const { id } = useParams();
    const searchParams = useSearchParams();
    const host = searchParams.get('host');

    const [checkEnrollment] = useCheckEnrollmentMutation();
    useEffect(() => {
        if (id && role?.id) {
            checkEnrollment({ session_id: id, user_id: role.id }).unwrap()
                .then((data) => {
                    !data?.data?.enrolled &&
                        router.push(`/`)
                })
        }
    }, [id, role?.id, checkEnrollment]);



    const { data, isLoading } = useGetSingleSessionQuery(id);

    const handleJoinSession = () => {
        window.open(data?.data?.zoomLink, "_blank")
    }

    function formatSessionDate(iso) {
        if (!iso || isNaN(new Date(iso))) {
            return { formattedDate: "", formattedTime: "" }; // return empty if invalid date
        }

        const dateObj = new Date(iso);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(dateObj);

        const formattedTime = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(dateObj);

        return { formattedDate, formattedTime };
    }
    const { formattedDate, formattedTime } = !isLoading && formatSessionDate(data?.data?.startTime);

    const sessionStartPlus30Min = new Date(new Date(data?.data?.startTime).getTime() + 30 * 60 * 1000);
    const sessionStartMinus30Min = new Date(new Date(data?.data?.startTime).getTime() - 30 * 60 * 1000);


    const copyMeetingId = async () => {
        try {
            await navigator.clipboard.writeText(data?.data?.meetingId)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy meeting ID")
        }
    }

    const getSessionTypeLabel = (type) => {
        switch (type) {
            case "weekly":
                return "Weekly Session"
            case "fortnightly":
                return "Fortnightly Session"
            case "monthly":
                return "Monthly Session"
            default:
                return "Session"
        }
    }

    const getSessionTypeColor = (type) => {
        switch (type) {
            case "weekly":
                return "bg-green-100 text-green-800"
            case "fortnightly":
                return "bg-blue-100 text-blue-800"
            case "monthly":
                return "bg-purple-100 text-purple-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                            <FaVideo className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ready to Join?</h1>
                        <p className="text-gray-600">Your session is about to begin</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border-0 mb-8">
                        <div className="p-8">
                            {/* <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{data?.data?.title}</h2>
                                <p className="text-gray-600 leading-relaxed">{data?.data?.description}</p>
                            </div> */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-2xl font-bold text-gray-900">{data?.data?.title}</h2>
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSessionTypeColor(data?.data?.frequency)}`}
                                    >
                                        <FaRedoAlt className="w-3 h-3 mr-1" />
                                        {getSessionTypeLabel(data?.data?.frequency)}
                                    </span>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{data?.data?.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <FaCalendarAlt className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
                                        <div className=" flex items-center gap-1">
                                            <p className="text-gray-600 text-sm">{formattedDate},</p>
                                            <p className="text-gray-600 text-sm">{formattedTime}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <FaClock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Duration</h3>
                                        <p className="text-gray-600 text-sm">{data?.data?.druration}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <FaUser className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Host</h3>
                                        <p className="text-gray-600 text-sm capitalize">{host}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <FaUsers className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Participants</h3>
                                        <div className="flex items-center space-x-2">
                                            {
                                                new Date() < sessionStartMinus30Min || new Date() > sessionStartPlus30Min ?
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        Unavailable
                                                    </span>
                                                    :
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Available
                                                    </span>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                    <FaMapMarkerAlt className="w-4 h-4 mr-2 text-primary" />
                                    Meeting Details
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Meeting ID:</span>
                                        <div className="flex items-center space-x-2">
                                            <code className="bg-white px-2 py-1 rounded text-sm font-mono">{data?.data?.meetingId}</code>
                                            <button
                                                onClick={copyMeetingId}
                                                className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                                                title="Copy Meeting ID"
                                            >
                                                {copied ? (
                                                    <FaCheck className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <FaCopy className="w-4 h-4 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Passcode:</span>
                                        <code className="bg-white px-2 py-1 rounded text-sm font-mono">{data?.data?.passcode}</code>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={handleJoinSession}
                                    className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 group inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                                >
                                    <FaVideo className="w-5 h-5" />
                                    <span>Join Session</span>
                                    <FaExternalLinkAlt className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </button>
                                <p className="text-xs text-gray-500 mt-3">This will open Zoom in a new window</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-3">
                            <FaInfoCircle className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-blue-900 mb-1">Before you join:</h4>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Make sure you have Zoom installed on your device</li>
                                    <li>• Test your camera and microphone</li>
                                    <li>• Find a quiet space with good lighting</li>
                                    <li>• Have a pen and paper ready for notes</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Need help? Contact support at{" "}
                            <a
                                href="mailto:morfitter@gmail.com"
                                className="text-primary hover:text-primary/80 transition-colors duration-200"
                            >
                                morfitter@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}