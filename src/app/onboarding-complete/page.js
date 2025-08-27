import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi';


const OnboardingComplete = () => {


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Onboarding Complete!</h1>
                <p className="text-gray-600 mb-6">
                    Your Stripe account has been successfully connected. You can now receive payouts and manage your earnings.
                </p>
                <Link href={`/trainer-profile/creating-session`}>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                        Go Back To Session Creation
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default OnboardingComplete;
