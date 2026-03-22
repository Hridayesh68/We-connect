import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, isSendingResetLink } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");
    forgotPassword({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-base-200 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mt-2">Forgot Password</h1>
          <p className="text-base-content/60">Enter your email to receive a reset link.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isSendingResetLink}>
            {isSendingResetLink ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
        <div className="text-center pt-4 border-t border-base-300">
          <Link to="/login" className="link link-primary">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
