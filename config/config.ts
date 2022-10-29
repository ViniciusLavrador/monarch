export default {
  db: {
    softDelete: {
      models: ["PropertyType", "Property", "PropertyAddress"],
    },
    preferences: {
      properties: {
        type: {
          models: ["PropertyType"],
        },
      },
    },
  },
};
