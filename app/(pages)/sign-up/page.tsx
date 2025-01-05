"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { MdError } from "react-icons/md";

import { LOADING_DELAY } from "@/libs/constants";
import Input from "@/components/Input";
import LoadingModal from "@/components/LoadingModal";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<AxiosError | undefined>();

    const clearForm = () => {
        setEmail("");
        setName("");
        setPassword("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await axios.post("/api/register", {
                email,
                name,
                password,
            });

            setIsError(false);
            clearForm();
            router.replace("/");
        } catch (error) {
            setIsError(true);
            if (error instanceof AxiosError) setError(error);
        } finally {
            setTimeout(() => {
                setSubmitting(false);
            }, LOADING_DELAY);
        }
    };

    return (
        <>
            {submitting && <LoadingModal />}
            <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign Up for Account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        noValidate
                    >
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={submitting}
                        />
                        <Input
                            label="Name"
                            type="text"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={submitting}
                        />
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <Input
                                type="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={submitting}
                            />
                        </div>
                        {isError && (
                            <div className="flex items-center gap-2 rounded-lg bg-rose-100 p-2 px-4 text-sm font-normal text-rose-500">
                                <MdError /> {error?.response?.data as string}
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-default disabled:opacity-50"
                            >
                                {submitting ? "Signing Up..." : "Sign Up"}
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?
                        <a
                            href="/"
                            className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
