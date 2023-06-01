export default class FeatureFlagOps {
  featureFlags: any;

  constructor(featureFlags?: any) {
    this.featureFlags = featureFlags || {
      treeView: true,
      searchResults: true,
      todoApp: true,
      editorMain: true,
      gpt: true,
      assetManager: true,
    };
  }

  saveFeatureFlags() {
    return new Promise((resolve, reject) => {
      localStorage.setItem("featureFlags", JSON.stringify(this.featureFlags));
      resolve("Feature flags saved.");
    });
  }

  loadFeatureFlags() {
    return new Promise((resolve, reject) => {
      const serializedFlags = localStorage.getItem("featureFlags");
      if (serializedFlags === null) {
        resolve(undefined);
      } else {
        resolve(JSON.parse(serializedFlags));
      }
    });
  }

  updateFeatureFlag(featureKey: string, value: boolean) {
    return new Promise((resolve, reject) => {
      if (this.featureFlags.hasOwnProperty(featureKey)) {
        this.featureFlags[featureKey] = value;
        this.saveFeatureFlags().then(() => {
          resolve(`Feature flag ${featureKey} updated to ${value}`);
        });
      } else {
        reject(`Feature flag ${featureKey} not found`);
      }
    });
  }


  printCurrentSelections() {
    console.log("Current feature flag selections:");
    for (const [key, value] of Object.entries(this.featureFlags)) {
      console.log(`${key}: ${value ? "enabled" : "disabled"}`);
    }
  }
}
