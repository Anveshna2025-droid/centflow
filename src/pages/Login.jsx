import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { TrendingUp, Loader2 } from 'lucide-react';

const Login = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    await loginWithGoogle();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cf-bg relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cf-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen"></div>

      <div className="w-full max-w-md p-8 glass-card rounded-3xl relative z-10 fade-up">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-cf-surface border border-cf-border rounded-2xl flex items-center justify-center mb-6 shadow-glow">
            <TrendingUp className="w-10 h-10 text-cf-accent" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-syne font-bold text-white mb-2 tracking-tight">Welcome to CentFlow</h1>
          <p className="text-cf-muted text-center">Your ultimate stock market dashboard.<br/>Sign in to access your portfolio.</p>
        </div>

        <button 
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="w-full py-3.5 px-4 bg-cf-surface border border-cf-border hover:border-cf-accent/50 rounded-xl text-cf-text font-medium flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-glow disabled:opacity-70"
        >
          {isLoggingIn ? (
            <Loader2 className="w-5 h-5 animate-spin text-cf-accent" />
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <p className="text-center text-cf-muted text-sm mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
