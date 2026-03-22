import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { KeyRound, Loader2, MailCheck } from "lucide-react";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState("");
  const { verifyEmail, isVerifyingEmail, authUser } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) return toast.error("OTP is required");
    verifyEmail({ email: authUser?.email, otp });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-base-200 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MailCheck className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Verify Your Email</h1>
            <p className="text-base-content/60">Enter the 6-digit code sent to your email.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">OTP Code</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="size-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isVerifyingEmail}>
            {isVerifyingEmail ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
