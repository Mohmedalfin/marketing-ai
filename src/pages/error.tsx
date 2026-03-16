import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    let errorMessage = "Terjadi kesalahan.";

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText || error.data;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-3xl font-bold text-slate-800">Oops 😢</h1>
            <p className="text-sm text-slate-500 mt-2">
                {errorMessage}
            </p>

            <Link
                to="/"
                className="mt-4 text-blue-500 font-medium hover:underline"
            >
                Kembali ke halaman utama
            </Link>
        </div>
    );
};

export default ErrorPage;