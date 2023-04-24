import React, {useState} from 'react';

const ImageContext = React.createContext();

function ImageProvider(props) {
  const [imgInfo, setImgInfo] = useState({ rideId: '',watermark:'',passId:'' });

  const updateImgInfo = (newInfo) => {
    setImgInfo(newInfo);
  }

  return (
    <ImageContext.Provider value={{ imgInfo, updateImgInfo }}>
      {props.children}
    </ImageContext.Provider>
  );
}

export { ImageContext, ImageProvider };