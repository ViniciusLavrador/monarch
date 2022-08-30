import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import Navigator from "./types";

const disclosurePanelBaseClasses = "text-sm text-gray-500 rounded-lg mt-2 p-4 bg-valhalla-50";
const rootDisclosurePanelClasses = classNames([disclosurePanelBaseClasses]);
const leaveDisclosurePanelClasses = classNames([disclosurePanelBaseClasses, "pb-0 pr-0 pt-0"]);
const baseNavigatorClasses =
  "flex w-full justify-between rounded-lg bg-valhalla-200 px-4 py-2 text-left text-sm font-medium text-white hover:bg-valhalla-300 mt-2 first:mt-0";
const rootNavigatorClasses = classNames([baseNavigatorClasses]);

const makeDisclosureList = (nav: Navigator.Navigator[], root: boolean) => {
  return (
    <>
      {nav.map((v) => {
        if (Navigator.isNavButton(v))
          return (
            <button
              className={root ? rootNavigatorClasses : baseNavigatorClasses}
              {...v.buttonProps}
            >
              {v.title}
            </button>
          );
        return (
          <Disclosure key={v.title}>
            {({ open }) => (
              <>
                <Disclosure.Button className={baseNavigatorClasses} {...v.buttonProps}>
                  <span>{v.title}</span>
                  <ChevronUpIcon
                    className={`${!open ? "rotate-180 transform" : ""} h-5 w-5 text-white`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  className={root ? rootDisclosurePanelClasses : leaveDisclosurePanelClasses}
                >
                  {makeDisclosureList(v.banchNavigator, false)}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}
    </>
  );
};

const Menu: React.FC<{ nav: Navigator.Navigator[] }> = ({ nav }) => {
  return <div>{makeDisclosureList(nav, true)}</div>;
};

export default Menu;
