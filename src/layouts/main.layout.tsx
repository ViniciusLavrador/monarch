import Nav from "../components/nav/nav";

const MainLayout: FCWithChildren = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Nav />
      <main className="container mx-auto grow pb-10 max-h-[85%]">{children}</main>
    </div>
  );
};

export default MainLayout;
