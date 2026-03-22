import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp, sendSignupOtp, isSendingOtp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      const otpSent = await sendSignupOtp({ email: formData.email });
      if (otpSent) setStep(2);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Verification code is required");
    signup({ ...formData, otp });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full pl-10`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={isSendingOtp}>
                {isSendingOtp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Verification Code</span>
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

              <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Verify & Sign Up"
                )}
              </button>
              
              <button 
                type="button" 
                className="btn btn-ghost w-full mt-2" 
                onClick={() => setStep(1)}
              >
                Back to Details
              </button>
            </form>
          )}

          <div className="divider text-base-content/60 text-sm py-4">OR</div>

          <div className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                useAuthStore.getState().googleLogin(credentialResponse.credential);
              }}
              onError={() => {
                toast.error("Google login failed");
              }}
            />
          </div>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;
