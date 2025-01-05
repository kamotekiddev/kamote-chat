"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { MdError } from "react-icons/md";

import Input from "@/components/Input";
import LoadingModal from "./components/LoadingModal";
import { LOADING_DELAY } from "./libs/constants";

interface Credentials {
    email: string;
    password: string;
}

export default function SignIn() {
    const router = useRouter();
    const { status } = useSession();

    const [submitting, setSubmiting] = useState(false);
    const [error, setError] = useState("");
    const [creds, setCreds] = useState<Credentials>({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (status === "authenticated") router.push("/chats");
    }, [status, router]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmiting(true);

        if (!creds.email || !creds.password) {
            setTimeout(() => {
                setSubmiting(false);
            }, LOADING_DELAY);
            return setError("Missing Information");
        }

        signIn("credentials", {
            ...creds,
            redirect: false,
            callbackUrl: "/chats",
        })
            .then((response) => {
                if (!response?.ok && response?.error) setError(response.error);
                router.replace(response?.url as string);
            })
            .catch(() => {
                setError("Internal Server Error");
            })
            .finally(() => {
                setTimeout(() => {
                    setSubmiting(false);
                }, LOADING_DELAY);
            });
    };

    const handleSignInWithGithub = () => {
        setSubmiting(true);
        signIn("github", { redirect: false, callbackUrl: "/chats" })
            .then((response) => {
                if (!response?.ok && response?.error) setError(response.error);
            })
            .catch(() => {
                setError("Internal Server Error");
            })
            .finally(() => {
                setTimeout(() => {
                    setSubmiting(false);
                }, LOADING_DELAY);
            });
    };

    const handleSignInWithGoogle = () => {
        setSubmiting(true);
        signIn("google", { redirect: false, callbackUrl: "/chats" })
            .then((response) => {
                if (!response?.ok && response?.error) setError(response.error);
            })
            .catch(() => {
                setError("Internal Server Error");
            })
            .finally(() => {
                setTimeout(() => {
                    setSubmiting(false);
                }, LOADING_DELAY);
            });
    };

    return (
        <>
            {submitting && <LoadingModal />}
            <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign In to your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        noValidate
                    >
                        <Input
                            onChange={(e) =>
                                setCreds((cred) => ({
                                    ...cred,
                                    email: e.target.value,
                                }))
                            }
                            value={creds.email}
                            type="text"
                            label="Email Address"
                            name="email"
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
                                onChange={(e) =>
                                    setCreds((cred) => ({
                                        ...cred,
                                        password: e.target.value,
                                    }))
                                }
                                value={creds.password}
                                type="password"
                                name="password"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 rounded-lg bg-rose-100 p-2 px-4 text-sm font-normal text-rose-500">
                                <MdError /> {error}
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-default disabled:opacity-50"
                            >
                                {submitting ? "Signing In" : "Sign In"}
                            </button>
                        </div>
                    </form>
                    <div className="my-10">
                        <div className="mb-5 flex items-center gap-4">
                            <hr className="flex-1" />
                            <div className="text-sm">Or Continue With</div>
                            <hr className="flex-1" />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleSignInWithGithub}
                                className="flex w-full justify-center rounded-md bg-transparent p-3 text-sm font-semibold leading-6 text-gray-500 ring-1 ring-gray-500 hover:bg-indigo-600 hover:text-white hover:ring-indigo-600"
                            >
                                <FaGithub />
                            </button>
                            <button
                                onClick={handleSignInWithGoogle}
                                className="flex w-full justify-center rounded-md bg-transparent p-3 text-sm font-semibold leading-6 text-gray-500 ring-1 ring-gray-500 hover:bg-indigo-600 hover:text-white hover:ring-indigo-600"
                            >
                                <FaGoogle />
                            </button>
                        </div>
                    </div>
                    <div>
                        <p className="text-center text-sm text-gray-500">
                            Not a member?
                            <a
                                href="/sign-up"
                                className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                                Create Account
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
