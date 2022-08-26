import { authOptions } from '../api/auth/[...nextauth]';
import type { GetServerSideProps, NextPage } from 'next/types';
import { getProviders, signIn } from 'next-auth/react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { unstable_getServerSession as getServerSession } from 'next-auth';

interface SignInPageProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session && session.user) {
    return {
      redirect: {
        destination: '/',
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
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div className='w-full'>
            <img src='/monarch-logo.svg' className='mx-auto h-50 w-auto' />

            <h2 className='mt-6 text-center text-xl font-extrabold text-gray-500'>
              Entre na sua conta
            </h2>
          </div>
          <div className='mt-8 space-y-6'>
            {Object.values(providers || {}).map((provider) => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-yellow-300 group-hover:text-yellow-200'
                    aria-hidden='true'
                  />
                </span>
                Entrar com {provider.name}
              </button>
            ))}
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
