import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
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
      {/* <NodeResizer minWidth={100} minHeight={30} /> */}
      {/* <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      /> */}
      {/* <div>
        <strong></strong>
      </div> */}
      {/* <Handle
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

      /> */}
     <StyleGuideReference websiteData={websiteData as WebsiteData} />

    </>
  );
});
export default FrameNode;
