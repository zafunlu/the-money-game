type FeatureFlags = {
  advertisements: boolean;
};

const featureFlags: FeatureFlags = {
  advertisements: false,
};

export const isFeatureOn = (feature: keyof FeatureFlags): boolean => {
  return featureFlags[feature] || false;
};
