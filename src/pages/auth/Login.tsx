import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LightLoginBg from '@/assets/auth/login/loginbg.png';
import DarkLoginBg from '@/assets/auth/login/loginbg.jpeg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginFormValues, loginSchema } from '@/types/auth';
import React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';
import GoogleSVG from '@/assets/icons/google.svg';
import { useAppDispatch } from '@/store';
import { loginUser } from '@/store/features/auth.slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/lib/axios';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isLoading, SetIsLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Handle the Input credentials for the login form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Handle the Credential login
  const HandleCredentialLogin = async (data: LoginFormValues) => {
    SetIsLoading(true);
    // Handle the login logic here
    const re = await dispatch(loginUser(data));
    if (re.meta.requestStatus === 'fulfilled') {
      toast.success('Login Successfully');
      SetIsLoading(false);
      navigate('/', {
        replace: true,
      });
      return;
    }
    if (re.meta.requestStatus === 'rejected') {
      toast.error(re.payload as string);
      SetIsLoading(false);
      return;
    }
  };

  // const HandleCredentialLogin = async (data: LoginFormValues) => {
  //   SetIsLoading(true);
  //   try {
  //     await axiosInstance.post(
  //       `/auth/login?redirect_url=${import.meta.env.VITE_LOGIN_REDIRECT_URL}`,
  //       {
  //         ...data,
  //       },
  //       // {
  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //     'x-login-type': 'local',
  //       //   },
  //       // },
  //     );
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       toast.error(error.response?.data?.message || 'Login failed');
  //     } else {
  //       toast.error('An unexpected error occurred');
  //     }
  //     SetIsLoading(false);
  //   }
  // };

  // const HandleGoogleLogin = () => {
  //   window.location.href = `http://localhost:5000/api/auth/login/google?redirect_url=${
  //     import.meta.env.VITE_LOGIN_REDIRECT_URL
  //   }`;
  // };

  // React.useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const error = url.searchParams.get('error');

  //   if (!error) {
  //     return;
  //   } else {
  //     toast.error(error);
  //   }
  // }, []);

  return (
    <>
      <div
        className={`w-full bg-gray-200 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:h-fit xl:overflow-hidden`}
      >
        <div className="h-screen p-3 grid">
          <nav className="p-2">
            <Label htmlFor="logo" className="text-xl text-primary">
              ADP
            </Label>
          </nav>

          <div>
            <div className="mx-auto grid w-[320px] 2xl:w-[360px] gap-6 ">
              <div className="grid gap-2 text-center">
                <Label className="text-3xl">Login</Label>
                <p className=" text-muted-foreground ">
                  Enter your credentials to login to your account
                </p>
              </div>
              <form
                onSubmit={handleSubmit(HandleCredentialLogin)}
                className="grid gap-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    disabled={isSubmitting || isLoading}
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="text-accent-foreground text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      {...register('password')}
                      placeholder="******"
                      type={showPassword ? 'text' : 'password'}
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isSubmitting || isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span className="sr-only">
                        {showPassword ? 'Hide password' : 'Show password'}
                      </span>
                    </Button>{' '}
                  </div>
                  {errors.password && (
                    <span className="text-accent-foreground text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full"
                  size={'sm'}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
              </form>
              {/* <div>
                <Button
                  variant="outline"
                  className="w-full"
                  size={'sm'}
                  disabled={isSubmitting || isLoading}
                  onClick={HandleGoogleLogin}
                >
                  <img src={GoogleSVG} alt="Google" className="mr-2 h-4 w-4" />
                  Login with Google
                </Button>
              </div> */}
            </div>
          </div>
        </div>
         <div className="hidden lg:block">
          {/* <img
            src={`${LightLoginBg}`}
            alt="Image"
            width="1920"
            height="1080"
            className="dark:hidden h-screen w-full object-cover "
          /> */}
          <img
            src={`${DarkLoginBg}`}
            alt="Image"
            width="1920"
            height="1080"
            className=" h-screen w-full object-cover shadow-xl shadow-black/30"
          />
        </div> 
        {/* <div className="hidden lg:block ">
          <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-4 h-10">
            <div className="grid gap-4 overflow-hidden h-screen">
              <div>
                <img
                  className="h-fit max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-fit max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-fit max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid gap-4 overflow-hidden h-screen">
              <div>
                <img
                  className="h-fit max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-fit max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-fit max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid gap-4 overflow-hidden h-fit">
              <div>
                <img
                  className="h-fit max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-fit max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-fit max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                  alt=""
                />
              </div>
            </div>
            {/* <div className="grid gap-4 overflow-hidden">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                  alt=""
                />
              </div>
            </div> */}
          {/* </div> */}
        {/* </div>  */}
      </div>
    </>
  );
};

export default Login;