import { authOptions } from "../api/auth/[...nextauth]";
import type {
  GetServerSideProps,
  NextPage,
} from "next/types";
import {
  getProviders,
  signIn,
} from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { unstable_getServerSession as getServerSession } from "next-auth";
import Image from "next/image";

interface SignInPageProps {
  providers: Awaited<
    ReturnType<typeof getProviders>
  >;
}

export const getServerSideProps: GetServerSideProps<
  SignInPageProps
> = async (context) => {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions,
  );

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

const SignInPage: NextPage<SignInPageProps> = ({
  providers,
}) => {
  return (
    <>
      <div className="flex items-center justify-center min-w-full min-h-screen">
        <div className="flex flex-col w-5/6 max-w-lg p-12 text-white rounded-lg bg-valhalla-200">
          <div className="relative w-full h-64">
            <Image
              src="/monarch-logo.svg"
              layout="fill"
              alt="Monarch logo"
            />
          </div>

          <div className="py-8" />
          {Object.values(providers || {}).map(
            (provider) => (
              <button
                key={provider.name}
                onClick={() =>
                  signIn(provider.id)
                }
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors ease-in-out bg-yellow-500 border border-transparent rounded-md  group hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="w-5 h-5 text-yellow-200 transition-colors ease-in-out group-hover:text-yellow-300"
                    aria-hidden="true"
                  />
                </span>
                Entrar com {provider.name}
              </button>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default SignInPage;
