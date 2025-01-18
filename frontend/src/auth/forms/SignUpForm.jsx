import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { Button } from "@/components/ui/button";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import GoogleAuth from '@/components/shared/GoogleAuth';

// Fix the schema for email validation
const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(50),
  email: z.string().email("Invalid email address").max(50),  // Fixed email validation
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(50),
});

const SignUpForm = () => {
  const {toast} = useToast()  // Make sure you have useToast properly set up
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const form = useReactHookForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Submit form
  async function onSubmit(values) {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        toast({ title: "Sign up failed! Please try again" });
        return setErrorMessage(data.message || "Unknown error occurred");
      }

      setLoading(false);
      if (res.ok) {
        toast({ title: "Sign up successful!" });
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
      toast({ title: "Something went wrong!" });
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto sm:max-w-5xl md:flex-row md:items-center">
        {/* Left */}
        <div className="flex-1">
          <Link to={"/"} className='flex flex-wrap text-2xl font-bold sm:text-4xl'>
            <span className="text-slate-500">Daily</span>
            <span className="text-slate-900">Newzz</span>
          </Link>
          
          <h2 className="text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-5 sm:pt-12">
            Create a new account
          </h2>
          <p className="text-slate-500 text-[14px] font-medium leading-[140%] md:text-[16px] md:font-normal mt-2">
            Welcome to Daily Newzz, Please provide your details
          </p>
        </div>

        {/* Right (form section) */}
        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="abc@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-blue-500" disabled={loading}>
                {loading ? <span className="animate-pulse">Loading.....</span> : <span>Sign Up</span>}
              </Button>
              <GoogleAuth/>
            </form>
          </Form>

          <div className='flex gap-2 mt-5 text-sm'>
            <span>Have an account?</span>
            <Link to={"/sign-in"} className='text-blue-500 hover:underline'>Sign In</Link>
          </div>
          {errorMessage && <p className='mt-5 text-red-500'>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
