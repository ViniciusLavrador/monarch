import Nav from "../components/nav/nav";

const MainLayout: FCWithChildren = ({ children }) => {
  return (
    <div className="w-screen h-screen">
      <Nav />
      <main className="container mx-auto place-content-center px-5 sm:px-0">{children}</main>
    </div>
  );
};

export default MainLayout;
