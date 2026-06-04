import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import axios from "axios";

import "../styles/AdminLogin.css";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");

    try {

      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/send-otp`,
        { email },
        {
          withCredentials: true
        }
      );

      if (data.success) {

        sessionStorage.setItem(
          "adminEmail",
          email
        );

        navigate("/verifyOtp");
      }

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Unable to send OTP"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <h1>Admin Login</h1>

        <p>
          OTP Based Authentication
        </p>

        {message && (
          <div className="error-box">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="input-box">

            <Mail size={18} />

            <input
              type="email"
              placeholder="Enter Admin Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? "Sending OTP..."
                : "Send OTP"
            }
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;