import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, isResettingPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return toast.error("Password is required");
    const success = await resetPassword(token, { password });
    if (success) navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-base-200 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mt-2">Set New Password</h1>
          <p className="text-base-content/60">Enter your new secure password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type="password"
                className="input input-bordered w-full pl-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isResettingPassword}>
            {isResettingPassword ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ResetPasswordPage;
