import React from 'react';
import Icon from '@src/components/IconWrapper/Icon';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import styles from './AssetCard.module.scss'; // Import the styles, adjust the path accordingly
import { formatBytes } from '../../utils/asset-Utils';
const AssetCard = ({
  image,
  index,
  selectedImages,
  currentCodeAccent,
  toggleImageSelection,
  searchTerm,
  downloadProgress,
  handleDownload
}) => {


  const highlightSearchTerm = (text: string, searchTerm: string) => {
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className={styles["Image__highlighted"]}>
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      key={index}
      className={`${styles["Asset__item"]} ${selectedImages.includes(index)
        ? styles["Asset__item--selected"]
        : ""
        }`}
      onClick={() => toggleImageSelection(index)}
      style={selectedImages.includes(index) ? { borderColor: currentCodeAccent } : {}}
    >
      <div className={styles["Image__thumbNail"]}>
        <img
          src={image.thumbUrl ? image.thumbUrl : image.cdnUrl}
          alt={image.name}
          className={styles["Image__image"]}
        />
        {selectedImages.includes(index) && (
          <div style={{ backgroundColor: currentCodeAccent }} className={styles["Image__selected"]} >
            <Icon id="check" size={16} color="grey" />
          </div>
        )}
      </div>
      <div className={styles["Image__details"]}>
        <div className={styles["image-metadata"]}>
          <p className={styles["Image__title"]} title={image.origFileName}>
            {highlightSearchTerm(image.origFileName, searchTerm)}
          </p>
          <p>{formatBytes(image.size)}</p>
          <p>{image.mimeType}</p>
        </div>
        <div className={styles["download-section"]}>
          <div className={styles["progress-bar"]}>
            <div
              className={styles["progress-bar__inner"]}
              style={{ width: `${downloadProgress[index]}%` }}
            ></div>
          </div>
          <RippleButton callBack={() => handleDownload(image.cdnUrl, index)}>
            <Icon id="download" size={16}></Icon>
          </RippleButton>
        </div>
      </div>
    </div>
  );
}


export default AssetCard;