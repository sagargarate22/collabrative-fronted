import {
  Card,
  CardContent,
  CardDescription,
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
import { Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { RegisterSchema, type RegisterFormData } from '../types/auth.schema';
import { Link } from 'react-router-dom';
import { useRegister } from "../hooks/authHooks";
import { ArrowRight, Loader } from "lucide-react";

export default function RegisterPage()
{

    console.log("render")
    const register = useRegister()
    const form = useForm<RegisterFormData>({
            resolver: zodResolver(RegisterSchema),
            defaultValues: {
                displayName:"",
                email:"",
                password:"",
                confirmPassword:""
            },
            mode: 'onChange'
        })

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        await register.mutateAsync(data)
    }

    return(
        <main className='flex flex-col h-auto items-center justify-center w-full mt-10 mb-10'>
            <header className='text-center'>
                    <h2 className='font-semibold text-2xl'>Flowboard</h2>
                    <span className='text-sm'>High-performance project tracking </span>
            </header>
            <Card className='w-full max-w-110 mt-10 card-elevation border-2 bg-red justify-center item-center bg-white'>
                <CardHeader>
                        <CardTitle className="font-semibold font-stretch-90% text-center">Create your account</CardTitle>
                        <CardDescription className="text-sm text-gray-500 text-center">
                            Start managing your boards in seconds.
                        </CardDescription>
                </CardHeader>

                <CardContent className='mr-2 ml-2'>
                    <form id='register-form' onSubmit={form.handleSubmit(onSubmit)}>
                        <Controller
                            name="displayName"
                            control={form.control}
                            render={({field, fieldState})=>(
                                <Field data-invalid={fieldState.invalid} className='mt-5'>
                                    <FieldLabel htmlFor='register-form-displayname'>
                                        Display Name
                                    </FieldLabel>
                                    <Input 
                                        {...field}
                                        id='register-form-displayname'
                                        autoComplete='off' 
                                        className='bg-background focus-visible:ring-1 focus-visible:border-blue-700'
                                        placeholder="Jon Doe"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="email"
                            control={form.control}
                            render={({field, fieldState})=>(
                                <Field data-invalid={fieldState.invalid} className='mt-5'>
                                    <FieldLabel htmlFor='register-form-email'>
                                        Email Address
                                    </FieldLabel>
                                    <Input 
                                        {...field}
                                        id='register-form-email'
                                        autoComplete='off' 
                                        className='bg-background focus-visible:ring-1 focus-visible:border-blue-700'
                                        placeholder="example@gmail.com"
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({field, fieldState})=>(
                                <Field data-invalid={fieldState.invalid} className='mt-5'>
                                    <FieldLabel htmlFor='register-form-password'>
                                        Password
                                    </FieldLabel>
                                    <Input 
                                        {...field}
                                        id='register-form-password'
                                        autoComplete='off' 
                                        className='bg-background focus-visible:ring-1 focus-visible:border-blue-700'
                                        type="password"
                                        placeholder="Enter Password"
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({field, fieldState})=>(
                                <Field data-invalid={fieldState.invalid} className='mt-5'>
                                    <FieldLabel htmlFor='register-form-confirmPassword'>
                                        Confirm Password
                                    </FieldLabel>
                                    <Input 
                                        {...field}
                                        id='register-form-confirmPassword'
                                        autoComplete='off' 
                                        className='bg-background focus-visible:ring-1 focus-visible:border-blue-700'
                                        type="password"
                                        placeholder="Enter Confirm Password"
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <p className='mt-3 text-wrap'>
                            By clicking 'Sing Up', you agree to our <span className='text-blue-400'>Terms of Service</span> and <span className='text-blue-400'>Policy</span>
                        </p> 

                        <Field className='mt-5'>
                            <Button type="submit" form="register-form" className="p-6 cursor-pointer gap-3">
                                    {register.isPending ? <Loader/> : (
                                        <>Sign In
                                        <ArrowRight data-icon="inline-end" className="h-4 w-4" />
                                        </>
                                    )} 
                            </Button>
                        </Field>
                    </form>

                    <hr className='mt-5'/>

                    <Field orientation='horizontal' className='justify-center item-center mt-5 mb-2'>
                        <p className='text-sm'>Already have an account?</p>
                        <Link to='/login' className='font-light text-blue-400 text-sm hover:underline'>Log In</Link>
                    </Field>
                </CardContent>
            </Card>
        </main>
    )
}