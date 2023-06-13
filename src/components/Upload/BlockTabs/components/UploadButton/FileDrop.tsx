import React, { useState, useEffect, useRef } from 'react';
import styles from './FileDrop.module.scss';
function FileDrop() {
    const [drag, setDrag] = useState(false);
    const [filename, setFilename] = useState("");
    const dropRef = useRef();

    const handleDrag = (e) => {
        e.preventDefault()
        setDrag(true);
    }

    const handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDrag(false);
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDrag(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFilename(e.dataTransfer.files[0].name);
            e.dataTransfer.clearData();
        }
    }

    useEffect(() => {
        let div = dropRef.current
        div.addEventListener('dragenter', handleDragIn)
        div.addEventListener('dragleave', handleDragOut)
        div.addEventListener('dragover', handleDrag)
        div.addEventListener('drop', handleDrop)
        return () => {
            div.removeEventListener('dragenter', handleDragIn)
            div.removeEventListener('dragleave', handleDragOut)
            div.removeEventListener('dragover', handleDrag)
            div.removeEventListener('drop', handleDrop)
        }
    });

    return (
        <div
            className={styles["FileDrop"]}
            ref={dropRef}
        >
            {drag &&
                <div style={{
                    border: 'dashed grey 4px',
                    backgroundColor: 'rgba(255,255,255,.8)',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999
                }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36
                        }}
                    >
                        <div>drop here :)</div>
                    </div>
                </div>
            }
            <p>Drag files here!</p>
            {filename && <p>Loaded file: {filename}</p>}
        </div>
    )
}

export default FileDrop;
