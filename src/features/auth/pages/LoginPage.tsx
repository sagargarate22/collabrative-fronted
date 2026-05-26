import {useForm, type SubmitHandler, Controller} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "../types/auth.schema";
import { Link, replace } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Lock,  EyeOff, ArrowRight, GitForkIcon, CircleAlert, Loader } from 'lucide-react';
import { useCallback, useState } from 'react';
import useLogin from '../hooks/authHooks';
import getApiAxiosError from '@/shared/utils/ApiErrorMessage';
import { useNavigate } from 'react-router-dom';

export default function LoginPage()
{
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false);

    const login = useLogin();

    const handlePassword = useCallback(()=> {
        setShowPass(!showPass);
    }, [showPass])

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        // mode: 'onChange'
    })

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        console.log("first")
        await login.mutateAsync(data)
        navigate('/dashboards', {replace:true})
    }

    return (
            <main className="w-full flex flex-col h-auto justify-center items-center mt-10 mb-10">
                <header className='text-center'>
                    <h2 className='font-semibold text-2xl'>Flowboard</h2>
                    <span className='text-sm'>High-performance project tracking </span>
                </header>
                <Card className="w-full max-w-110 mt-10 pt-8 card-elevation border-2">
                    <CardHeader className='ml-2 mr-2'>
                        <CardTitle className="font-semibold text-lg">Welcome Back</CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            Sign in to continue to your workspace.
                        </CardDescription>
                    </CardHeader>

                    {login.isError && (
                        <CardContent className="ml-2 mr-2">
                            <div className='bg-destructive/30 rounded-md flex px-5 p-5  gap-3 items-start'>
                                <CircleAlert className='text-destructive/80'/>
                                <p className='text-sm text-center text-destructive/80'>{getApiAxiosError(login.error)}</p>
                            </div>
                        </CardContent>
                    )}
                    
                    <CardContent className='ml-2 mr-2'>
                        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                            <Controller 
                                name="email"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor='login-form-email'>
                                            Email address
                                        </FieldLabel>
                                        <div className='relative flex justify-center items-center'>
                                            <Mail className="absolute left-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                                            <Input 
                                            {...field}
                                            id='login-form-email'
                                            placeholder='example@gmail.com'
                                            // autoComplete='off' 
                                            className='bg-background px-10 focus-visible:ring-1 focus-visible:border-blue-700'
                                            />
                                        </div>
                                        {fieldState.error
                                         && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller 
                                name="password"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid} className='mt-5'>
                                        <Field orientation='horizontal'>
                                            <FieldLabel htmlFor='login-form-password' className='text-sm'>
                                                Password
                                            </FieldLabel>
                                            <Link className="text-sm text-blue-400" to='/register'>Forgot Password?</Link>
                                        </Field>
                                        <div className="relative flex justify-center items-center">
                                            <Lock className='absolute left-3 h-5 w-5 text-muted-foreground pointer-events-none'/>
                                            <Input 
                                            {...field}
                                            id='login-form-password'
                                            autoComplete='off'
                                            className='bg-background px-10 focus-visible:ring-1 focus-visible:border-blue-700'
                                            placeholder='Your password'
                                            type={showPass? 'text' : 'password'}
                                            />
                                            {showPass ? (
                                                <Eye className='absolute right-2.5 text-muted-foreground cursor-pointer' onClick={handlePassword}/>
                                            ) : (<EyeOff className='absolute right-2.5 text-muted-foreground cursor-pointer' onClick={handlePassword}/>)}
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Field className='mt-8'>
                                <Button type="submit" form="login-form" className="p-6 cursor-pointer gap-3">
                                    {login.isPending ? <Loader/> : (
                                        <>Sign In
                                        <ArrowRight data-icon="inline-end" className="h-4 w-4" />
                                        </>
                                    )} 

                                </Button>
                            </Field>

                            <Field className='mt-8 gap-5' orientation='horizontal'>
                                <hr className='w-full'/>
                                <span>OR</span>
                                <hr className='w-full'/>
                            </Field>

                            <Field orientation='horizontal' className='justify-center mt-8 gap-5'>
                                <Button type="button" className="px-12 py-6 text-black bg-white border-gray-400 hover:bg-gray-200 cursor-pointer">
                                    <GitForkIcon/>
                                    Google
                                </Button>

                                <Button type="button" className="px-12 py-6 text-black  bg-white border-gray-400 hover:bg-gray-200 cursor-pointer">
                                    <GitForkIcon/>
                                    GitHub
                                </Button>
                            </Field>
                        </form>
                    </CardContent>
                    <CardFooter className='bg-background mt-3'>
                        <Field orientation='horizontal' className='justify-center items-center'>
                                <h3 className='text-sm'>Don't have an account?</h3>
                                <Link className='text-sm text-blue-600 hover:underline' to="/register">Create an account</Link>
                        </Field>
                    </CardFooter>
                </Card>

                <div>
                    <ul className='flex list-disc  gap-10 mt-8 text-sm text-gray-400'>
                        <li className='cursor-pointer list-none'>Privacy Policy</li>
                        <li className='cursor-pointer'>Term of Service</li>
                        <li className='cursor-pointer'>Contact Support</li>
                    </ul>
                </div>
            </main>
    )
}