export const loadFeatureFlags = () => {
  try {
    const serializedFlags = localStorage.getItem("featureFlags");
    if (serializedFlags === null) {
      return undefined;
    }
    return JSON.parse(serializedFlags);
  } catch (err) {
    return undefined;
  }
};

export const saveFeatureFlags = (flags) => {
  try {
    const serializedFlags = JSON.stringify(flags);
    localStorage.setItem("featureFlags", serializedFlags);
  } catch {
    // ignore write errors
  }
};