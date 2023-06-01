import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from 'react-loading-skeleton';
import React from 'react';
export interface SkeletonRowProps {
  ref: any;
}

export const SkeletonRow = ({ }: SkeletonRowProps) => {
  // return <div className={styles['drop-down']}>{children}</div>;
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Skeleton style={{ borderRadius: '10px', marginBottom: '12px' }} baseColor="#202020" inline="false" highlightColor="#444" width="100%" height="112px" >
        </Skeleton>
        <div className='result-item-skeleton'> </div>
      </div>
    </>
  )
};
