import { useRouteError, Navigate } from "react-router-dom";

export default function Error() {
    // Get the error that React Router provides
    const error = useRouteError();

    // If the error is a redirect (status 302), navigate to the new location
    if (error?.status === 302 && error?.headers) {
        const location = error.headers.get("Location");
        return <Navigate to={location || "/"} />;
    }

    // Otherwise, show a simple friendly message
    return (
        <div className="error-container" style={{ padding: "2rem", textAlign: "center" }}>
            <h1 style={{ color: "red" }}>Oops! Something went wrong.</h1>
        </div>
    );
}
