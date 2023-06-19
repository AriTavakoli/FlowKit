import FeatureFlagOps from '@src/Utils/LocalStorage/FeatureFlags'
import Dropdown from '@src/components/Util/DropDown/DropDown'
import { capitalize } from 'lodash-es'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import styles from './Options.module.scss'
import { useGlobalContext } from '@Context/Global/GlobalProvider'
import { detectSystemColorScheme, getExtensionVersion } from '@src/Utils/gptutil'
import CustomToggleButton from '@src/components/Util/toggle/toggleSwitch'
import ProviderSelect from './ProviderSelect'

import {
  Language,
  TRIGGER_MODE_TEXT,
  Theme,
  TriggerMode,
  getUserConfig,
  updateUserConfig,
} from '@src/config/config'


function OptionsPage(props: { theme: Theme; onThemeChange: (theme: Theme) => void }) {

  const {
    retrieveSetting,
    handleUserSettingsChange
  } = useGlobalContext();

  const languageOptions = Object.entries(Language).map(([k, v]) => ({
    value: v,
    label: capitalize(v),
    icon: 'language-icon', // Replace this with the appropriate icon id for each language
  }));



  const [colorValue, setColorValue] = useState('');
  const [codeTheme, setCodeTheme] = useState('nord');


  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting('accentColor');
      console.log('%cretrievedColor', 'color: lightblue; font-size: 14px', userSettings);
      if (userSettings) {
        setColorValue(userSettings.accentColor);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);


  const [triggerMode, setTriggerMode] = useState<TriggerMode>(TriggerMode.Always)
  const [language, setLanguage] = useState<Language>(Language.Auto)

  useEffect(() => {
    getUserConfig().then((config) => {
      setTriggerMode(config.triggerMode)

      setLanguage(config.language)
    })
  }, [])

  const onTriggerModeChange = useCallback(
    (mode: TriggerMode) => {
      setTriggerMode(mode)
      updateUserConfig({ triggerMode: mode })
      toast.success('Changes saved');
    },
    [props],
  )

  const onThemeChange = useCallback(
    (theme: Theme) => {
      updateUserConfig({ theme })
      props.onThemeChange(theme)
      toast.success('Changes saved');
    },
    [props],
  )

  const onLanguageChange = useCallback(
    (language: Language) => {
      updateUserConfig({ language })
      toast.success('Changes saved');
    },
    [props],
  )



  return (
    <div className={styles['Options__container']} >
      <nav >
        <div >
          <span >FlowKit (v{getExtensionVersion()})</span>
        </div>
      </nav>


      <ParentComponent />

      <div className={styles["Options__colorContainer"]}>
        <span className={styles["Options__title"]}>FlowKit Custom Color:</span>
        <input
          className={styles["Options__colorPicker"]}
          value={colorValue}
          type="color"
          onChange={(e) => { handleUserSettingsChange({ type: 'accentColor', value: e.target.value }); setColorValue(e.target.value); }}
        />
      </div>


      <div className={styles["Options__colorContainer"]}>
      <span className={styles["Options__title"]}>Code Theme:</span>
        <select
          value={colorValue}
          onChange={(e) => {
            handleUserSettingsChange({ type: 'codeTheme', value: e.target.value });
            setCodeTheme(e.target.value);
          }}
        >
          <option value="oneDark">github</option>
          <option value="docco">docco</option>
          <option value="darcula">darcula</option>
          <option value="duotoneDark">duotoneDark</option>
          <option value="duotoneEarth">duotoneEarth</option>
          <option value="duotoneForest">duotoneForest</option>
          <option value="duotoneLight">duotoneLight</option>
          <option value="duotoneSea">duotoneSea</option>
          <option value="duotoneSpace">duotoneSpace</option>


        </select>
      </div>


      <Toaster></Toaster>

      <ProviderSelect></ProviderSelect>


      <div className= {styles["Options__triggerContainer"]}>
        <main className={styles["Options__triggerMode"]}>
          <h3>Trigger Mode</h3>
          <div>
            {Object.entries(TRIGGER_MODE_TEXT).map(([value, texts]) => (
              <div key={value}>
                <input
                  type="radio"
                  name="triggerMode"
                  value={value}
                  checked={triggerMode === value}
                  onChange={(e) => onTriggerModeChange(e.target.value)}
                />
                {texts.title}
                <p>{texts.desc}</p>
              </div>
            ))}
          </div>
          {/* <h3>Theme</h3>
          <div>
            {Object.entries(Theme).map(([k, v]) => (
              <div key={v}>
                <input
                  type="radio"
                  name="theme"
                  value={v}
                  checked={props.theme === v}
                  onChange={(e) => onThemeChange(e.target.value)}
                />
                {k}
              </div>
            ))}
          </div> */}
          <h3>Language</h3>
          <p>
            The language used in ChatGPT response. <em>Auto</em> is recommended.
          </p>
          <Dropdown
            options={languageOptions}
            label={"Language"}
            onChange={(option) => onLanguageChange(option.value)}
            menuPosition={{maxHeight : '200px', overflow: 'auto'}}
          />
          <h3>AI Provider</h3>
          {/* Add your ProviderSelect component here */}
          <h3>Misc</h3>
          <div>
            <input type="checkbox" defaultChecked disabled />
            <label>Auto delete conversations generated by search</label>
          </div>
        </main>
      </div>
    </div>


  )
}



function Options() {
  const [theme, setTheme] = useState(Theme.Auto)

  const themeType = useMemo(() => {
    if (theme === Theme.Auto) {
      return detectSystemColorScheme()
    }
    return theme
  }, [theme])

  useEffect(() => {
    getUserConfig().then((config) => setTheme(config.theme))
  }, [])

  return (
    <OptionsPage theme={theme} onThemeChange={setTheme} />
  )
}

export default Options




const FeatureFlagToggleButtons = ({ featureName, onFeatureToggle, featureFlags }) => {

  const [isEnabled, setIsEnabled] = useState(featureFlags[featureName]);

  useEffect(() => {
    setIsEnabled(featureFlags[featureName]);
  }, [featureFlags, featureName]);



  return (
    <div className={styles["Options__toggleRow"]}>
      <span className={styles["Options__toggleRow--title"]}>{featureName}</span>

      <CustomToggleButton
        featureName={featureName}
        isEnabled={isEnabled}
        onToggle={onFeatureToggle}
      />
    </div>
  );
};
const ParentComponent = () => {
  const [featureFlags, setFeatureFlags] = useState({
    StyleGuide: true,
    // searchResults: false,
    // todoApp: false,
    Template_Editor: true,
    Webflow_GPT: true,
    Asset_Manager: true,
    // ideaExplorer: false,
  });

  const featureFlagOps = new FeatureFlagOps(featureFlags);

  useEffect(() => {
    featureFlagOps.loadFeatureFlags().then((loadedFlags) => {
      if (loadedFlags) {
        setFeatureFlags({ ...featureFlags, ...loadedFlags });
      }
    });
  }, []);


  useEffect(() => {

    const featureFlagOps = new FeatureFlagOps();


    featureFlagOps.loadFeatureFlags();

    // featureFlagOps.removeFeatureFlag('todoApp');


  }, []);





  const handleFeatureSelect = (featureName, selectedValue) => {
    featureFlagOps.updateFeatureFlag(featureName, selectedValue).then(() => {
      setFeatureFlags((prevFeatureFlags) => {
        const updatedFeatureFlags = { ...prevFeatureFlags, [featureName]: selectedValue };
        // Save the updated feature flags using the saveFeatureFlags method
        featureFlagOps.featureFlags = updatedFeatureFlags;
        featureFlagOps.saveFeatureFlags();
        return updatedFeatureFlags;
      });
      featureFlagOps.printCurrentSelections();
      toast.success('Feature flag updated');
    });
  };

  console.log(featureFlags, 'featureFlags');
  return (
    <div className={styles["Options__featureContainer"]}>
      <h2>Feature Flags:</h2>
      {Object.entries(featureFlags).map(([featureName, isEnabled]) => (
        <FeatureFlagToggleButtons
          key={featureName}
          featureName={featureName}
          featureFlags={featureFlags}
          onFeatureToggle={handleFeatureSelect}
        />
      ))}
    </div>
  );
};
