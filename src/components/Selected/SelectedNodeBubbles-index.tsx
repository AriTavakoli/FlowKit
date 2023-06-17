import '@Global/index.scss';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MultiSelect from '../Buttons/MultiSelect/multiSelect-index';
import QueryBubble from '../Buttons/RippleButton/QueryBubble';
import Icon from '../IconWrapper/Icon';
import StorageOps from '../../Utils/LocalStorage/StorageOps';
import { useGlobalContext } from '@Context/Global/GlobalProvider';

type Mode =
  | {
    mode: 'add';
    icons: ['add'];
  }
  | {
    mode: 'edit';
    icons: ['edit'];
  }
  | {
    mode: 'delete';
    icons: ['delete'];
  };

interface FragType {
  uuid: string;
  active: boolean;
  queryName: string;
  bubbleColor: string;
}


interface SelectedNodeTemplateProps {
  accessType: 'cssTemplate' | 'template';
}



export default function SelectedNodeTemplates({ accessType, sequenceRef, handleSwitchTab }: SelectedNodeTemplateProps) {
  const [mode, setMode] = useState('normal');
  const [selectedButtonUUID, setSelectedButtonUUID] = useState<string | null>(null);
  const [activeButtonUUID, setActiveButtonUUID] = useState<string | null>(null);
  const [inActiveButtonUUID, setInActiveButtonUUID] = useState<string | null>(null);
  const [storageUpdated, setStorageUpdated] = useState(0);

  const {
    switchTab,
    handleEditTemplate,
  } = useGlobalContext();

  const [fragList, setFragList] = useState<FragType[]>([]);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    (async () => {

      let templates;

      switch (accessType) {
        case 'default':
          templates = await StorageOps.getAllStorageItemsByAccessType(accessType);
          break;
        case 'currentNode':
          templates = await StorageOps.getAllTemplatesForNode(sequenceRef.getId())
          break;
        default:
          templates = await StorageOps.getAllStorageItemsByAccessType(accessType);
          break;
      }


      if (templates) {
        console.log('%cnodeTemplates', 'color: lightblue; font-size: 44px', templates);
        const newFragList = Object.keys(templates).map((template) => {
          return {
            uuid: uuidv4(),
            active: templates[template] ? templates[template].active : false,
            ...templates[template],
          };
        });
        setFragList([...newFragList]);
      }
    })();
  }, [storageUpdated]);




  useEffect(() => {
    (async () => {
      let update = await StorageOps.watchForStorageUpdate();
      setStorageUpdated(storageUpdated + 1);

    })();
  });


  const handleSelected = (type: string, uuid: string) => {
    switch (type) {
      case 'active':
        setActiveButtonUUID(uuid);
        break;
      case 'inActive':
        setInActiveButtonUUID(uuid);
        break;
    }
    setSelectedButtonUUID(uuid);
  };

  const handleModeChange = (mode: string) => {
    console.log(mode, 'mode');
    setMode(mode);

    if (mode === 'normal') {
      setSelectedButtonUUID(null);
      setActiveButtonUUID(null);
      setInActiveButtonUUID(null);
    }
  };


  const handleAdd = (uuid: string) => {
    const frag = fragList.find((f) => f.uuid === uuid);
    if (frag) {
      const newList = [...fragList];
      const index = newList.indexOf(frag);
      newList[index].active = !newList[index].active;
      setFragList(newList);
    }
  };

  function handleDelete(queryName: string) {
    if (mode === 'delete' && selectedButtonUUID) {
      const index = fragList.findIndex((frag) => frag.uuid === selectedButtonUUID);
      const newList = [...fragList];
      newList.splice(index, 1);
      setFragList(newList);
      setSelectedButtonUUID(null);
      handleModeChange('normal');

     switch (accessType) {

        case 'default':
          StorageOps.deleteStorageItemByAccessType(queryName , accessType)
          break;
        case 'currentNode':
          StorageOps.deleteTemplateFromNode(sequenceRef.getId(), queryName)
          break;
        case 'cssTemplate':
          StorageOps.deleteStorageItemByAccessType(queryName , accessType)
          break;
        default:
          StorageOps.deleteStorageItemByAccessType(queryName , accessType)
          break;
      }


    }
  }

  const iconMapped = (queryName: string) => {
    const iconSize = 12;

    switch (mode.toString()) {
      case 'normal':
        return (
          <>
            <div className={'icon--container'}>
              <div className={'add'} onClick={(e) => {
                handleModeChange('edit')
                handleSwitchTab('dTab');
                handleEditTemplate(queryName);
                // switchTab('dTab');

              }}>
                <Icon id="edit" color="grey" size={iconSize} />
              </div>
              <div className={'edit'} onClick={
                (e) => {
                  handleModeChange('delete');
                  console.log('yooo');
                }
              }>
                <Icon id="trash" color="grey" size={iconSize} />
              </div>
            </div>
          </>
        );
      case 'add':
        return (
          <>
            <div className={'icon--container'}>
              <div className={'add'} onClick={(e) => {
              }}>
                <Icon id="add" color="grey" size={iconSize} />
              </div>

            </div>
          </>
        );
      case 'edit':
        return (
          <>
            <div className={'icon--container'}>
              <div className={'edit'} onClick={(e) => {
                // console.log('%c queryName', 'color: lightblue; font-size: 14px',  queryName);

                handleModeChange('normal');
              }}>
                <Icon id="close" color="grey" size={iconSize} />
              </div>
              <div className={'check'} onClick={(e) => handleModeChange('normal')}>
                <Icon id="check" color="grey" size={iconSize} />
              </div>
            </div>
          </>
        );
      case 'delete':
        return (
          <>
            <div className={'icon--container'}>
              <div className={'edit'} onClick={(e) => handleModeChange('normal')}>
                <Icon id="close" color="grey" size={iconSize} />
              </div>
              <div className={'check'} onClick={(e) => handleDelete(queryName)}>
                <Icon id="check" color="grey" size={iconSize} />
              </div>
            </div>
          </>
        );
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(mode, 'mode');
  }, [mode]);



  const activeFragList = fragList ? fragList.filter((frag) => frag.active) : [];
  const activeTemplates = activeFragList.map((frag) => {
    if (!frag) return null;

    console.log(frag, 'frag');

    const { uuid, templateName, bubbleColor } = frag;

    return (
      <div
        className={'filter__item'}
        onClick={() => {
          handleSelected('active', uuid);
          mode === 'add' ? StorageOps.changeTemplateActiveProperty(templateName, false, accessType) : null;
        }}
        onMouseEnter={() => setHovering(uuid)}
        onMouseLeave={() => { setHovering(null); mode === 'add' ? null : setMode('normal'); }}
        key={uuid} // Add key prop to the wrapping div
      >
        <QueryBubble
          shape="rounded"
          dot={true}
          dotColor={bubbleColor}
          custom={true}
          customColor={bubbleColor}
          text={templateName}
          selected={selectedButtonUUID === uuid}
        >
          <div>{mode === "add" && iconMapped(() => { console.log('setting to active'); })}</div>
          <div>{hovering === uuid && mode !== "add" && iconMapped(templateName)}</div>
        </QueryBubble>
      </div>
    );
  });



  const inactiveFragList = fragList ? fragList.filter((frag) => !frag.active) : [];
  const inactiveTemplates = inactiveFragList.map((frag) => {

    if (!frag) return null;

    const { uuid, templateName, bubbleColor } = frag;

    return (
      <div
        className={'filter__item'}
        onClick={() => {
          handleSelected('active', uuid);
          mode === 'add' ? StorageOps.changeTemplateActiveProperty(templateName, true, accessType) : null;

        }}
        onMouseEnter={() => setHovering(uuid)}
        onMouseLeave={() => { setHovering(null); mode === 'add' ? null : setMode('normal'); }}
        key={uuid}
      >
        <QueryBubble
          shape="rounded"
          dot={true}
          dotColor={bubbleColor}
          custom={true}
          customColor={bubbleColor}
          text={templateName}
          selected={selectedButtonUUID === uuid}
        >
          <div>{mode === "add" && iconMapped(templateName)}</div>
          <div>{hovering === uuid && mode !== "add" && iconMapped(templateName)}</div>
        </QueryBubble>
      </div>
    );
  });



  return (
    <div className={'filter__container'}>
      <div className={'active'}>
        <div className={'filter__topBar'}>
          <div className={'filter__title'}>Active</div>
          <MultiSelect handleModeChange={handleModeChange}></MultiSelect>
        </div>
        <div className={'active__container'}>
          {activeTemplates}
        </div>

      </div>
      <div className={'inactive'}>
        <div className={'filter__title'}>Available</div>
        <div className={'divider'}></div>
        {inactiveTemplates}
      </div>
    </div>
  );
}
