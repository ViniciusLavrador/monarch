import React, { useState } from "react";
import Menu, {
  applyActiveClassnameToContainer,
  MenuButtonContainer,
} from "../../components/menu/menu";
import Navigator from "../../components/menu/types";
import * as PreferencePanes from "../../components/preference-panes";

type PreferencePaneKeys = keyof typeof PreferencePanes;

const DynamicPane: React.FC<{ pane: PreferencePaneKeys }> = ({ pane }) => {
  switch (pane) {
    case "PropertyPane":
      return <PreferencePanes.PropertyPane />;
  }
};

const PreferencesPage: NextPageWithLayout = () => {
  const [pane, setPane] = useState<PreferencePaneKeys | null>();

  const isSomePaneActive = (panes: PreferencePaneKeys[]) => (pane ? panes.includes(pane) : false);

  const preferencesNavigator: Navigator.Navigator[] = [
    {
      key: "preferences",
      component: "Preferências Gerais",
      buttonProps: {
        className: applyActiveClassnameToContainer(isSomePaneActive(["PropertyPane"])),
      },
      panelProps: {
        className: applyActiveClassnameToContainer(isSomePaneActive(["PropertyPane"]), true),
      },
      navigator: [
        {
          key: "properties-preferences",
          component: <MenuButtonContainer>Preferência de Propriedades</MenuButtonContainer>,
          buttonProps: {
            onClick: () => {
              setPane("PropertyPane");
            },
            className: applyActiveClassnameToContainer(isSomePaneActive(["PropertyPane"])),
          },
        },
      ],
    },
  ];

  return (
    <div className="flex flex-row gap-4">
      <div className="text-white w-1/5">
        <Menu nav={preferencesNavigator} />
      </div>
      {pane && (
        <div className="w-5/6 bg-valhalla-200 bg-opacity-30 rounded-lg p-5 text-white">
          <DynamicPane pane={pane} />
        </div>
      )}
    </div>
  );
};

PreferencesPage.layout = "main";

export default PreferencesPage;
