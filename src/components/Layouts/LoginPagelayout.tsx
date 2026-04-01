import LoginFormSection from "../Sections/AuthPage/LoginPageSection";

export default function LoginPageLayout() {
    return (
        // bg-light-bg akan memberikan warna krem ke seluruh halaman Login
        <div className="min-h-screen bg-light-bg flex flex-col items-center justify-center">
            
            <main className="w-full">
                <LoginFormSection />
            </main>
            
        </div>
    );
}