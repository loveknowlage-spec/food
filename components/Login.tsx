
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ChevronLeft, User, Eye, EyeOff, Camera, AlertCircle, Loader2, X } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';

interface LoginProps {
  onAdminLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onAdminLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Sign In
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // Check if admin
          if (user.email === 'diptoislam2006@gmail.com' && onAdminLogin) {
            onAdminLogin();
            navigate('/admin');
          } else {
            navigate('/');
          }
        } catch (err: any) {
           setError('Password or Email Incorrect');
        }
      } else {
        // Sign Up
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          let photoURL = '';
          if (profileImage) {
            const storageRef = ref(storage, `profiles/${user.uid}`);
            await uploadBytes(storageRef, profileImage);
            photoURL = await getDownloadURL(storageRef);
          }

          await updateProfile(user, {
            displayName: fullName,
            photoURL: photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=f97316&color=fff`
          });

          navigate('/');
        } catch (err: any) {
          if (err.code === 'auth/email-already-in-use') {
            setError('User already exists. Sign in?');
          } else {
            setError('Failed to create account. Please try again.');
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-24 overflow-hidden bg-[#F8F9FB]">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl opacity-50 floating"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl opacity-50 floating-delayed"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest mb-10 transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="bg-white/40 backdrop-blur-2xl p-10 md:p-12 rounded-[3.5rem] border border-white/60 shadow-2xl relative overflow-hidden">
          {error && (
            <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest py-3 px-6 flex items-center gap-3 animate-in slide-in-from-top duration-300 z-50">
              <AlertCircle size={16} />
              <span className="flex-grow">{error}</span>
              <button onClick={() => setError('')} className="ml-auto opacity-70 hover:opacity-100">
                <X size={14} />
              </button>
            </div>
          )}

          <div className="flex flex-col items-center text-center mb-10 mt-4">
            <div className="bg-gradient-to-br from-[#E139B3] to-[#69298C] px-4 py-1.5 rounded-sm shadow-lg mb-6">
              <span className="text-white text-2xl font-black tracking-tighter leading-none italic">DIPTO</span>
            </div>
            <h2 className="text-4xl font-serif font-bold italic text-slate-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              {isLogin ? 'Enter your details to enjoy the best flavors.' : 'Join us for an exclusive culinary experience.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-5">
            {!isLogin && (
              <>
                <div className="flex justify-center mb-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-full bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-all overflow-hidden relative group"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Camera size={24} className="text-slate-300 group-hover:text-orange-500" />
                        <span className="text-[8px] font-black uppercase text-slate-300 group-hover:text-orange-500 mt-1">Upload</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    className="w-full bg-white/60 border border-white/80 pl-14 pr-6 py-4 rounded-2xl outline-none focus:border-orange-200 focus:bg-white transition-all font-bold text-slate-900 text-sm"
                  />
                </div>
              </>
            )}

            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/60 border border-white/80 pl-14 pr-6 py-4 rounded-2xl outline-none focus:border-orange-200 focus:bg-white transition-all font-bold text-slate-900 text-sm"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/60 border border-white/80 pl-14 pr-14 py-4 rounded-2xl outline-none focus:border-orange-200 focus:bg-white transition-all font-bold text-slate-900 text-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Repeat Password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-white/60 border border-white/80 pl-14 pr-14 py-4 rounded-2xl outline-none focus:border-orange-200 focus:bg-white transition-all font-bold text-slate-900 text-sm"
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-orange-500 hover:shadow-2xl transition-all active:scale-95 disabled:opacity-70 mt-4 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Sign Up'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-grow bg-white/40"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Or continue with</span>
            <div className="h-px flex-grow bg-white/40"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-white/60 border border-white/80 py-4 rounded-2xl hover:bg-white transition-all group">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/60 border border-white/80 py-4 rounded-2xl hover:bg-white transition-all group">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Apple_logo_black.svg" className="w-5 h-5" alt="Apple" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Apple</span>
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-400 text-xs font-bold">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-slate-900 hover:text-orange-500 transition-colors uppercase tracking-widest ml-1"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
