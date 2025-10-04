import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'
function AuthPage() {
    const navigate = useNavigate()
  const [hidden, setHidden] = useState(true);
  const [loading, setloading] = useState(false)
  const [bgUrl, setBgUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchRandom = async () => {
      const accessKey = "97CAwvVvmKDsARa0jKfFtDI7JdYyNqyl3_KyG9QmazY";
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=graduation,university,students,alumni&orientation=landscape&client_id=${accessKey}`
      );
      const data = await response.json();
      setBgUrl(data.urls.full);
    };
    fetchRandom();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const response = await login(email,password);
      setErrorMessage("")
      if (response.status === 200) {
       toast.success("Login Successful! Redirecting...")
        setTimeout(() => navigate("/admin"), 2000);
      }
    } catch (error) {
        setErrorMessage(error.response.data.message)
      console.log(error);
    }finally{
      setloading(false)
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
      <Toaster richColors position="top-right" />
      <div className="hidden  lg:flex w-4/5  items-center justify-center relative overflow-hidden">
        <img
          src={bgUrl}
          alt="Illustration"
          className=" absolute  w-full top-0 left-0 object-cover h-full mx-auto opacity-90 drop-shadow-2xl"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 bg-white">
        <div className="mb-7 flex flex-col justify-center items-center">
          <img onClick={()=>navigate("/")}
            src="https://pcte.edu.in/wp-content/uploads/2025/04/Logo-1-28_4.png"
            alt="Logo"
            className="w-34 mb-10 mr-7"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Sign in to Admin Panel
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter your credentials to access the dashboard
          </p>
          {errorMessage && (
            <div className="mt-2 w-full text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
                  />
                </svg>
                {errorMessage}
              </div>

              <button
                onClick={() => setErrorMessage("")}
                className="text-red-500 hover:text-red-700 transition"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <form className="flex flex-col gap-8">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@college.edu"
              className="w-full border-b border-gray-300 focus:border-red-500 outline-none text-gray-800 py-2 transition-all"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-500 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={hidden ? "password" : "text"}
              placeholder="••••••••"
              className="w-full border-b border-gray-300 focus:border-red-500 outline-none text-gray-800 py-2 pr-10 transition-all"
            />
            <button
              type="button"
              onClick={() => setHidden(!hidden)}
              className="absolute right-0 top-[36px] text-gray-400 hover:text-gray-600"
            >
              {hidden ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
          </div>

          <button
          onClick={handlesubmit}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg shadow-md transition-all">
            {loading ? "Signing in..." : "Sign In"}
          </button>

          
        </form>

        <p className="text-[11px] w-full text-center text-gray-400 mt-16">
          © {new Date().getFullYear()} Alumni Talks. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
