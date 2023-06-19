import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from 'react-loading-skeleton';
import React from 'react';
export interface SkeletonRowProps {
  ref: any;
}

const SkeletonCode = ({lineHeight}: SkeletonRowProps) => {
  // return <div className={styles['drop-down']}>{children}</div>;

  console.log('lineHeight', lineHeight);


  return (
    <>
        <Skeleton style={{lineHeight: 5, height: lineHeight }} baseColor="#202020" inline="false" highlightColor="#444" width="100%" >
        </Skeleton>
    </>
  )
};

export default SkeletonCode;