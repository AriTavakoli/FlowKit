import { FC, useCallback, useState } from 'react'
import useSWR from 'swr'
import React, { useEffect } from 'react'
import { fetchExtensionConfigs } from '@src/config/api'
import { getProviderConfigs, ProviderConfigs, ProviderType, saveProviderConfigs } from '@src/config/config'
import { getChatGPTAccessToken, fetchModelNames } from '../Background/providers/chatgpt'
import StorageOps from '@src/Utils/LocalStorage/StorageOps'
import { toast, Toaster } from 'react-hot-toast'
import styles from './Options.module.scss'

interface ConfigProps {
  config: ProviderConfigs
  models: string[]
}

async function loadModels(): Promise<string[]> {
  const configs = await fetchExtensionConfigs()

  console.log(configs, 'configs');
  return configs.openai_model_names
}
const ConfigPanel: FC<ConfigProps> = ({ config, models, chatGPTModels }) => {

  const [tab, setTab] = useState<ProviderType>(config.provider)
  const [apiKey, setApiKey] = useState(config.configs[ProviderType.GPT3]?.apiKey ?? '');
  const [model, setModel] = useState(config.configs[ProviderType.GPT3]?.model ?? models[0])
  const [localModel, setLocalModel] = useState(config.configs[ProviderType.ChatGPT]?.model ?? models[0]) // New state for local model

  const [currentModel, setCurrentModel] = useState('')

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };


  useEffect(() => {
    (async () => {
      const currentModel = await StorageOps.getSelectedModel()
      const allModels = await StorageOps.getAllStorageItems();

      console.log('%callModels', 'color: lightblue; font-size: 14px', allModels);
      console.log('%ccurrentModel', 'color: lightblue; font-size: 14px', currentModel);
      setCurrentModel(currentModel)
    })();
  });



  const handleTabChange = (event) => {
    setTab(event.target.value);
  };

  const handleModelChange = (event) => {
    setCurrentModel(event.target.value);
    setModel(event.target.value);
  };

  const handleLocalModelChange = (event) => {
    setCurrentModel(event.target.value);
    setLocalModel(event.target.value);
  };


  const save = useCallback(async () => {

    if (tab === ProviderType.GPT3) {
      if (!apiKey) {
        alert('Please enter your OpenAI API key');
        return;
      }
      // if (!model || !models.includes(model)) {
      //   console.log(model, 'model');
      //   alert('Please select a valid model');
      //   return 'text-davinci-003'
      // }
    }
    console.log('%clocalModel', 'color: lightblue; font-size: 14px', localModel);
    const savedModel = await new StorageOps('modelSelected', 'modelSelected', localModel).addStorageItem()

    await saveProviderConfigs(tab, {
      [ProviderType.ChatGPT]: {
        model: localModel,
      },
      [ProviderType.GPT3]: {
        model : 'text-davinci-003', // Use the model state variable here
        apiKey: apiKey, // Use the apiKey state variable here
      },
    });
    toast.success('Changes saved')
  }, [apiKey, localModel, model, models, tab])

  return (
    <div className={styles["Options__modelContainer"]}>
      <div onChange={handleTabChange}>
        <input
          type="radio"
          id="chatGPTWebapp"
          name="provider"
          value={ProviderType.ChatGPT}
          checked={tab === ProviderType.ChatGPT}
        />
        <label htmlFor="chatGPTWebapp">ChatGPT webapp</label>

        <input
          type="radio"
          id="openAIAPI"
          name="provider"
          value={ProviderType.GPT3}
          checked={tab === ProviderType.GPT3}
        />
        <label htmlFor="openAIAPI">OpenAI API</label>
      </div>

      <div className={styles["Options__tabContainer"]}>

        {tab === ProviderType.ChatGPT && (
          <div className={styles["Options__modelContainer--webpApp"]}>
            <div className= {styles["Options__webAppBody"]}>
              <span>
                The API that powers ChatGPT webapp, free, but sometimes unstable
              </span>
              <span>
                CurrentModels : {localModel?.toString()}
              </span>
            </div>

            <select value={localModel} onChange={handleLocalModelChange}>
              {chatGPTModels.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        )}

        {tab === ProviderType.GPT3 && (
          <div className="flex flex-col gap-2">
            <span>
              OpenAI official API, more stable,{' '}
              <span className="font-semibold">charge by usage</span>
            </span>
            <div className="flex flex-row gap-2">
              <select value={model} onChange={handleModelChange}>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <input
                type="password"
                value={apiKey} // Use the apiKey state variable here
                onChange={handleApiKeyChange} // Use the handleApiKeyChange event handler here
                placeholder="API key"
              />
            </div>
            <span className="italic text-xs">
              You can find or create your API key{' '}
              <a
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </span>
          </div>
        )}
      </div>

      <button onClick={save}>Save</button>
    </div>
  );
}


function ProviderSelect() {
  const [chatGPTModels, setChatGPTModels] = useState([]);


  useEffect(() => {
    (async () => {
      const chatGptModelNames = await loadChatGPTModels();
      setChatGPTModels(chatGptModelNames);
    })();
  }, []);

  const query = useSWR('provider-configs', async () => {
    const [config, models] = await Promise.all([getProviderConfigs(), loadModels()])
    console.log('%cmodels', 'color: lightblue; font-size: 14px', models);

    console.log('%cconfig', 'color: lightblue; font-size: 14px', config);
    return { config, models }

  })
  if (query.isLoading) {
    return <div>Loading...</div>
  }
  return <ConfigPanel config={query.data!.config} models={query.data!.models} chatGPTModels={chatGPTModels} />;

}


async function loadChatGPTModels() {
  try {
    const token = await getChatGPTAccessToken();
    const modelNames = await fetchModelNames(token);
    console.log(modelNames, 'ChatGPT model names');

    return modelNames;
    // Do something with the model names, e.g. update state or call other functions
  } catch (error) {
    console.error('Error fetching ChatGPT models:', error);
  }
}


export default ProviderSelect