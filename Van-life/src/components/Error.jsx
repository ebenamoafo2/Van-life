import { useRouteError, Navigate } from 'react-router';

export default function Error() {
    const error = useRouteError();
    
    // Handle redirect errors
    if (error.status === 302) {
        return <Navigate to={error.headers.get("Location")} />;
    }
    
    return (
        <div className="error-container">
            <h1>Error: {error.message || "Something went wrong!"}</h1>
            <pre>{error.status} - {error.statusText}</pre>
        </div>
    );
}