// src/components/Layouts/ProfilePageLayout.tsx

import Navbar from "../Fragments/Navbar";
import FooterSection from "../Fragments/Footer";
import UserProfileCard from "../Sections/Profile/ProfileSection";
import { useProfileController } from "../../hooks/useProfileController";

export default function ProfilePageLayout() {
    const { user, isLoading, error } = useProfileController();

    return (
        <div className="relative min-h-screen bg-light-bg overflow-x-hidden">
            <Navbar variant="app" />

            <main className="flex-1 w-full mt-16 relative z-10">

                {/* State: Error */}
                {error && !isLoading && (
                    <div className="w-full px-6 md:px-12 lg:px-16 pt-10">
                        <div className="mx-auto max-w-7xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600 flex items-center gap-2">
                            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}

                {/* State: Loading skeleton */}
                {isLoading && (
                    <div className="w-full px-6 md:px-12 lg:px-16 pb-16 pt-10">
                        <div className="mx-auto max-w-7xl rounded-[28px] border border-[#D9DED8]/70 bg-white p-4 sm:p-5 md:p-6 animate-pulse">
                            <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-4 md:gap-5">
                                <div className="h-64 rounded-[26px] bg-gray-100" />
                                <div className="grid grid-cols-2 gap-3">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="h-20 rounded-[22px] bg-gray-100" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* State: Data siap */}
                {!isLoading && user && (
                    <UserProfileCard user={user} />
                )}

            </main>

            <FooterSection />
        </div>
    );
}