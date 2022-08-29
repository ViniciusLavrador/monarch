import { authOptions } from "../api/auth/[...nextauth]";
import type { GetServerSideProps, NextPage } from "next/types";
import { getProviders, signIn } from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { unstable_getServerSession as getServerSession } from "next-auth";
import Image from "next/image";
import Button from "../../components/button/button";

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
      <div className="flex items-center justify-center min-w-full min-h-screen">
        <div className="flex flex-col w-5/6 max-w-lg p-12 text-white rounded-lg bg-valhalla-200">
          <div className="relative w-full h-64">
            <Image src="/monarch-logo.svg" layout="fill" alt="Monarch logo" />
          </div>

          <div className="py-8" />
          {Object.values(providers || {}).map((provider) => (
            <Button
              variant="highlight"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="flex justify-between group"
            >
              Entrar com {provider.name}
              <LockClosedIcon
                className="w-5 h-5 text-yellow-200 transition-colors ease-in-out group-hover:text-yellow-300"
                aria-hidden="true"
              />
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SignInPage;
