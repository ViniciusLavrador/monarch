import { authOptions } from "../api/auth/[...nextauth]";
import type { GetServerSideProps, NextPage } from "next/types";
import { getProviders, signIn } from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { unstable_getServerSession as getServerSession } from "next-auth";
import Image from "next/image";

interface SignInPageProps {
    providers: Awaited<ReturnType<typeof getProviders>>;
}

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session && session.user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const providers = await getProviders();
    return {
        props: { providers },
    };
};

const SignInPage: NextPage<SignInPageProps> = ({ providers }) => {
    return (
        <>
            <div className="min-h-screen min-w-full flex items-center justify-center">
                <div className="bg-valhalla-200 p-12 flex flex-col rounded-lg max-w-lg text-white w-5/6">
                    <div className="w-full h-64 relative">
                        <Image src="/monarch-logo.svg" layout="fill" alt="Monarch logo" />
                    </div>

                    <div className="py-8" />
                    {Object.values(providers || {}).map((provider) => (
                        <button
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="
                                group relative w-full flex justify-center py-2 px-4 
                                border border-transparent text-sm font-medium rounded-md
                                text-white hover:bg-yellow-600 bg-yellow-500
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300
                                transition-colors ease-in-out
                            "
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon
                                    className="h-5 w-5 group-hover:text-yellow-300 text-yellow-200 transition-colors ease-in-out"
                                    aria-hidden="true"
                                />
                            </span>
                            Entrar com {provider.name}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SignInPage;
