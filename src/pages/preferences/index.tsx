import { useState } from "react";
import Menu from "../../components/menu/menu";
import Navigator from "../../components/menu/types";

const Home: NextPageWithLayout = (props) => {
  const [selection, setSelection] = useState("default");
  return (
    <div className="flex flex-row gap-4">
      <div className="text-white w-1/5">
        <Menu
          nav={[
            { title: "tab 1", buttonProps: { onClick: () => setSelection("tab 1") } },
            {
              title: "tab 2",
              buttonProps: { onClick: () => setSelection("tab 2") },
              banchNavigator: [
                { title: "tab 3", buttonProps: { onClick: () => setSelection("tab 3") } },
              ],
            },
            {
              title: "tab 4",
              buttonProps: { onClick: () => setSelection("tab 4") },
              banchNavigator: [
                { title: "tab 5", buttonProps: { onClick: () => setSelection("tab 5") } },
                { title: "tab 6", buttonProps: { onClick: () => setSelection("tab 6") } },
              ],
            },
            {
              title: "tab 7",
              buttonProps: { onClick: () => setSelection("tab 7") },
              banchNavigator: [
                {
                  title: "tab 8",
                  buttonProps: { onClick: () => setSelection("tab 8") },
                  banchNavigator: [
                    {
                      title: "tab 9",
                      buttonProps: { onClick: () => setSelection("tab 9") },
                      banchNavigator: [
                        {
                          title: "tab 10",
                          buttonProps: { onClick: () => setSelection("tab 10") },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </div>
      <div className="w-5/6 bg-valhalla-200 bg-opacity-30 h-96 rounded-lg">{selection}</div>
    </div>
  );
};

Home.layout = "main";

export default Home;
