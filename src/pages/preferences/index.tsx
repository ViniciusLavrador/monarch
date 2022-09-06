import dynamic from "next/dynamic";
import React, { useState } from "react";
import Menu from "../../components/menu/menu";
import Navigator from "../../components/menu/types";

enum PREFERENCES_PAGE_PANES {
  DEFAULT,
  PROPERTY,
}

const paneComponents: Record<PREFERENCES_PAGE_PANES, any> = {
  [PREFERENCES_PAGE_PANES.DEFAULT]: () => <></>,
  [PREFERENCES_PAGE_PANES.PROPERTY]: dynamic(() => import("./panes/property-pane"), {
    suspense: true,
  }),
};

const DynamicPane = ({ pane }: { pane: PREFERENCES_PAGE_PANES }) => paneComponents[pane];

const PreferencesPage: NextPageWithLayout = (props) => {
  const [pane, setPane] = useState(PREFERENCES_PAGE_PANES.DEFAULT);

  const preferencesNavigator: Navigator.Navigator[] = [
    {
      key: "preferences",
      component: "Preferências Gerais",
      navigator: [
        {
          key: "properties",
          component: "Propriedades",
          buttonProps: {
            onClick: () => {
              setPane(PREFERENCES_PAGE_PANES.PROPERTY);
            },
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
      {pane !== PREFERENCES_PAGE_PANES.DEFAULT && (
        <div className="w-5/6 bg-valhalla-200 bg-opacity-30 h-96 rounded-lg p-5 text-white">
          <React.Suspense>
            <DynamicPane pane={pane} />
          </React.Suspense>
        </div>
      )}
    </div>
  );
};

PreferencesPage.layout = "main";

export default PreferencesPage;
