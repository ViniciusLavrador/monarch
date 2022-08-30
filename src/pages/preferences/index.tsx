import Head from "next/head";

const Home: NextPageWithLayout = (props) => {
  return (
    <>
      <div className="h-screen font-bold text-white">/preferences</div>
    </>
  );
};

Home.layout = "main";

export default Home;
