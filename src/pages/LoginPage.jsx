import { Link, useNavigate } from "react-router";

const LoginPage = () => {
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const dataObj = {
            email,
            password,
        };

        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(dataObj),
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await resp.json();
        if (resp.status === 201) {
            alert("Login successful");
            navigate("/");
        } else {
            alert("Login Error", result.message);
        }
        // put this all code in try catch
    };

    return (
        <div className="min-h-[100vh] p-4 flex items-center justify-center">
            <form onSubmit={handleLogin} className="p-6 flex flex-col items-start gap-4 bg-emerald-200 rounded-lg">
                <div className="flex gap-4 items-center">
                    <label className="text-gray-700" htmlFor="user-email">
                        Email:
                    </label>
                    <input
                        id="user-email"
                        type="email"
                        name="email"
                        required
                        className="border-1 rounded-md py-1 px-2 text-indigo-700"
                    ></input>
                </div>
                <div className="flex gap-4 items-center">
                    <label className="text-gray-700" htmlFor="user-password">
                        Password:
                    </label>
                    <input
                        id="user-password"
                        type="password"
                        name="password"
                        required
                        className="border-1 rounded-md py-1 px-2 text-indigo-700"
                    ></input>
                </div>
                <div className="flex flex-col gap-3 items-center self-stretch">
                    <button className="border-1 py-1 px-2 rounded-lg text-xl bg-green-700 text-white cursor-pointer">
                        Login
                    </button>
                    <p className="flex flex-col gap-2 items-center justify-center">
                        <span>Don't have an account?</span>
                        <Link to="/signup" className="text-blue-600 underline">
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export { LoginPage };
