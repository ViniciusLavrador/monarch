import PropertiesPreferencesSection from "./sections/properties-preferences/properties-preferences.section";

const PropertyPane: React.FC = ({}) => {
  return (
    <div className="w-5/6 bg-valhalla-200 bg-opacity-30 rounded-lg p-5 text-white">
      <PropertiesPreferencesSection />
    </div>
  );
};

export default PropertyPane;
