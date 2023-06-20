import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStyleguideContext } from '../../../context/StyleguideReferenceContext';
import StyleGuideReference from '../../StyleGuideReference';

const FrameNode = memo(({ data, isConnectable }) => {

  const {
    websiteData,
    currentNodeData,
    setCurrentNodeData,
  } = useStyleguideContext();


  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        <br/>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 10, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}

      />
     <StyleGuideReference websiteData={websiteData as WebsiteData} />

    </>
  );
});
export default FrameNode;
