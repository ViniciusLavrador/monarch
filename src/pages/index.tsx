import type { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';

import Head from 'next/head';
import { getServerSidePropsWithSession } from '../utils/auth';

type HomeProps = { sesh: Session };

export const getServerSideProps: GetServerSideProps<HomeProps> = getServerSidePropsWithSession(
  async ({ session }) => {
    return {
      props: {
        sesh: session,
      },
    };
  },
);

const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='pt-6 text-2xl text-blue-500 flex justify-center items-center w-full'>
          sesh: {props.sesh.user?.name}
        </div>
      </main>
    </>
  );
};

export default Home;
