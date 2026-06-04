import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import api from "../utils/api.js"; 
import { loginSuccess } from "../features/auth/authSlice.js";
import '../styles/VerifyOtp.css';

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = sessionStorage.getItem("adminEmail");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/AdminLogin");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);
      // console.log("1. frontend otp submit : ", { email, otp });

      
      const { data } = await api.post('/api/admin/verify-otp', { email, otp });
      
      // console.log("2. server(Response Data):", data);

      if (data.success) {
        console.log("3. லாகின் சக்சஸ்! ரீடுக்ஸ் டிஸ்பாட்ச் ஆகப்போகிறது...");
        
    
        dispatch(loginSuccess({ email }));

       
        
      
        navigate("/admin");
      }

    } catch (err) {
      setMessage(err.response?.data?.message || "OTP Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-card">
        <ShieldCheck size={60} />
        <h2>Verify OTP</h2>
        <p>Enter the OTP sent to your email</p>

        {message && <div className="error-box">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 4 Digit OTP"
            required
          />
          <button type="submit" disabled={loading || otp.length !== 4}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
