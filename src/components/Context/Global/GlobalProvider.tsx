import React, { createContext, useContext, useReducer, useRef, useState, useEffect } from 'react';
import { useTabOperations } from './hooks/useTab';
import SettingOps from './classes/SettingsOps';
import { Settings, Setting, RenderOptions } from '@Types/Settings/settings.types';


const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

interface GlobalContextProps {
  tabRefs: any;
  activeTab: string;
  setActiveTab: any;
  setRefs: any;
  switchTab: (tab: string) => void;
  currentNodeAnalysis: NodeAnalysis | null;
  setCurrentNodeAnalysis: any;
  currentTemplate: string | null;
  currentRenderer: "Custom" | "Default";
  retrieveSetting: (settingName: string) => Promise<Setting>;
  setCurrentTemplate: any;
  handleEditTemplate: (templateName: string) => void;
  printAllStorageItems: () => Promise<void>;
  handleChangeRenderer: (rendererName: RenderOptions) => void;
  handleAccentColorChange: (color: string) => Promise<void>;
  handleUserSettingsChange: (setting: Setting) => Promise<void>;
}


export function GlobalProvider({ children }) {

  const [currentTemplate, setCurrentTemplate] = useState<string | null>(null);
  const [currentRenderer, setCurrentRenderer] = useState<"Custom" | "Default">('Default');
  const [currentNodeAnalysis, setCurrentNodeAnalysis] = useState(null);

  const [theme, setTheme] = useState<Settings['theme']>('light');

  useEffect(() => {



    SettingOps.getTheme().then((theme) => {
      setTheme(theme);
    }
    );
  }, []);


  useEffect(() => {
    console.log('%ctheme', 'color: lightblue; font-size: 54px', theme);
  }, [theme]);



  const [activeTab, setActiveTab] = useState<'aTab' | 'bTab' | 'cTab' | 'dTab' | 'eTab' | 'fTab'>('dTab');

  const [appColor, setAppColor] = useState<string>();

  const [tabRefs, setTabrefs] = useState({});


  const {
    switchTab,
  } = useTabOperations(tabRefs);



  const printAllStorageItems = async () => {
    let setting = await SettingOps.printAllStorageItems();
    console.log('%csetting', 'color: lightblue; font-size: 14px', setting);

  }

  const handleAccentColorChange = async (color: string) => {
    setAppColor(color);
    let setting = await SettingOps.addStorageItem('accentColor', 'userSettings', color);
  };

  const handleUserSettingsChange = async (setting: Setting) => {
    let updatedSetting = await SettingOps.addStorageItem(setting.type, 'userSettings', setting.value);
    // console.log('%csetting', 'color: lightblue; font-size: 14px', updatedSetting);
  };

  const retrieveSetting = async (settingName: string): Promise<Setting> => {
    let setting: Setting = await SettingOps.getUserSettings();
    return setting;
  };


  const handleEditTemplate = (templateName: string) => {
    setCurrentTemplate(templateName);
  };

  useEffect(() => {
    console.log(currentRenderer, 'currentrendermehtod');
  });


  const handleChangeRenderer = (rendererName: RenderOptions) => {
    setCurrentRenderer(rendererName);
  };

  const ctx: GlobalContextProps = {
    theme,
    tabRefs,
    setTheme,
    switchTab,
    activeTab,
    setTabrefs,
    setActiveTab,
    currentTemplate,
    currentRenderer,
    retrieveSetting,
    setCurrentTemplate,
    handleEditTemplate,
    currentNodeAnalysis,
    printAllStorageItems,
    handleChangeRenderer,
    setCurrentNodeAnalysis,
    handleAccentColorChange,
    handleUserSettingsChange,
  };

  return (
    <GlobalContext.Provider value={ctx}>
      <div className={`theme--${theme === 'dark' ? 'dark' : 'light'}`}>{children}</div>
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}


