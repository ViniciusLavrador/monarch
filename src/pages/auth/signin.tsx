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
                <div className="bg-valhalla-200 pb-4 px-4 pt-0 flex flex-col rounded-lg">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex aliquam, nam
                        magni officiis blanditiis maxime quod praesentium doloribus iste quae iure
                        voluptates corporis labore est, similique a natus delectus harum.
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignInPage;
