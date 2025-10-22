import { useSearchParams } from "react-router-dom"
import { useState } from "react"

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })

    // useSearchParams gives us access to URL query parameters
    const [searchParams] = useSearchParams()

    // Extract the "message" query parameter from the URL
    const message = searchParams.get("message")


    function handleSubmit(e) {
        e.preventDefault()
        console.log(loginFormData)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {/* Conditional rendering for redirect messages */}

            {message && (
                <p className="login-message" style={{ color: "red", marginBottom: "1rem" }}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button>Log in</button>
            </form>
        </div>
    )

}