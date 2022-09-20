import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Menu, {
  applyActiveClassnameToContainer,
  MenuButtonContainer,
} from "../../components/menu/menu";
import Navigator from "../../components/menu/types";
import * as PreferencePanes from "../../components/preference-panes";

type PreferencePaneKeys = keyof typeof PreferencePanes;

const isPreferencePaneKey = (pane: string): pane is PreferencePaneKeys => {
  return Object.keys(PreferencePanes).includes(pane);
};

const DynamicPane: React.FC<{ pane: PreferencePaneKeys }> = ({ pane }) => {
  switch (pane) {
    case "PropertyPane":
      return <PreferencePanes.PropertyPane />;
  }
};

const PreferencesPage: NextPageWithLayout = () => {
  const [pane, setPane] = useState<PreferencePaneKeys | null>();

  const { push, asPath } = useRouter();

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
              push("#property-pane");
            },
            className: applyActiveClassnameToContainer(isSomePaneActive(["PropertyPane"])),
          },
        },
      ],
    },
  ];

  useEffect(() => {
    const hash = (asPath.split("#")[1] || "")
      .split("-")
      .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
      .join("");

    if (isPreferencePaneKey(hash)) {
      setPane("PropertyPane");
    }
  }, [asPath]);

  return (
    <>
      <Head>
        <title>Monarch | Preferências de Propriedades</title>
      </Head>

      <div className="flex flex-row gap-4">
        <div className="text-white w-1/5">
          <Menu nav={preferencesNavigator} />
        </div>
        {pane && <DynamicPane pane={pane} />}
      </div>
    </>
  );
};

PreferencesPage.layout = "main";

export default PreferencesPage;
