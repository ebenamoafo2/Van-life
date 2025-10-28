import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();

    console.log(error);

    return (
        <div>
            <h1 style={{color: "red"}}>Something went wrong</h1>

            {error.statusText && <p>{error.statusText}</p>}

            {error.message && <p>{error.message}</p>}
        </div>
    );
}
