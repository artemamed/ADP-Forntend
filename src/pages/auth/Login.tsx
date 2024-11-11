import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginFormValues, loginSchema } from '@/types/auth';
import React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';
import { useAppDispatch } from '@/store';
import { loginUser } from '@/store/features/auth.slice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isLoading, SetIsLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const images = [
    {
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
      alt: '',
    },
    {
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg',
      alt: '',
    },
    {
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg',
      alt: '',
    },
    {
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg',
      alt: '',
    },
    {
      src: 'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg',
      alt: '',
    },
  ];

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
            </div>
          </div>
        </div>



        <div className="hidden lg:block">
          <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-4 h-screen overflow-hidden">
            <motion.div
              initial={{ y: 0 }}
              animate={{
                y: ['0%', '-100%'], // Animate the Y position from 0 to -100%, creating a smooth scroll
              }}
              transition={{
                duration: 300, // Duration for the entire scroll, adjust as needed
                repeat: Infinity, // Infinite loop
                repeatType: 'loop', // Seamless looping, no reverse
                ease: 'linear', // Constant, linear motion for smooth scrolling
              }}
              className="flex flex-col gap-4"
            >
              {/* Render the images twice to ensure seamless looping */}
              {[...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images].map((image, index) => (
                <img
                  key={index}
                  className="h-fit max-w-full rounded-lg"
                  src={image.src}
                  alt={image.alt}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 0 }}
              animate={{
                y: ['-50%', '0%'], // Animate the Y position from 0 to -100%, creating a smooth scroll
              }}
              transition={{
                duration: 250, // Duration for the entire scroll, adjust as needed
                repeat: Infinity, // Infinite loop
                repeatType: 'loop', // Seamless looping, no reverse
                ease: 'linear', // Constant, linear motion for smooth scrolling
              }}
              className="flex flex-col gap-4"
            >
              {/* Render the images twice to ensure seamless looping */}
              {[...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images].map((image, index) => (
                <img
                  key={index}
                  className="h-fit max-w-full rounded-lg"
                  src={image.src}
                  alt={image.alt}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 0 }}
              animate={{
                y: ['0%', '-100%'], // Animate the Y position from 0 to -100%, creating a smooth scroll
              }}
              transition={{
                duration: 300, // Duration for the entire scroll, adjust as needed
                repeat: Infinity, // Infinite loop
                repeatType: 'loop', // Seamless looping, no reverse
                ease: 'linear', // Constant, linear motion for smooth scrolling
              }}
              className="flex flex-col gap-4"
            >
              {/* Render the images twice to ensure seamless looping */}
              {[...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images].map((image, index) => (
                <img
                  key={index}
                  className="h-fit max-w-full rounded-lg"
                  src={image.src}
                  alt={image.alt}
                />
              ))}
            </motion.div>
          </div>
        </div>









      </div>
    </>
  );
};

export default Login;
