import type { GetServerSideProps } from "next";
import { Session } from "next-auth";

import { getServerSidePropsWithSession } from "../utils/auth";

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

const Home: NextPageWithLayout<HomeProps> = (props) => {
  return (
    <>
      <div className="h-screen">
        <div className="flex flex-row gap-10"></div>
      </div>
      <div className="h-screen">hey</div>
    </>
  );
};

Home.layout = "main";

export default Home;
