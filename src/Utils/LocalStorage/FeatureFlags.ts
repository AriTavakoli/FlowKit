export default class FeatureFlagOps {
  featureFlags: any;

  constructor(featureFlags?: any) {
    this.featureFlags = featureFlags || {
      StyleGuide: true,
      treeView: true,
      // searchResults: true,
      // todoApp: true,
      Template_Editor: true,
      Asset_Manager: true,
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
      console.log('%c serializedFlags', 'color: lightblue; font-size: 44px', serializedFlags);
      if (serializedFlags === null) {
        resolve(undefined);
      } else {
        resolve(JSON.parse(serializedFlags));
      }
    });
  }


  addFeatureFlag(featureKey: string, value: boolean) {
    return new Promise((resolve, reject) => {
      if (this.featureFlags.hasOwnProperty(featureKey)) {
        reject(`Feature flag ${featureKey} already exists`);
      } else {
        this.featureFlags[featureKey] = value;
        this.saveFeatureFlags().then(() => {
          resolve(`Feature flag ${featureKey} added`);
        });
      }
    });
  }



  removeFeatureFlag(featureKey: string) {
    return new Promise((resolve, reject) => {
      if (this.featureFlags.hasOwnProperty(featureKey)) {
        delete this.featureFlags[featureKey];
        this.saveFeatureFlags().then(() => {
          resolve(`Feature flag ${featureKey} removed`);
        });
      } else {
        reject(`Feature flag ${featureKey} not found`);
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
