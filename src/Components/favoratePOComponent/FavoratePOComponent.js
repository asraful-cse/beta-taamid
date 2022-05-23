import { useState } from 'react';
import heart from '../../images/card/Heart.png';
import redHeart from '../../images/card/filledHeart.png';
import { showToast } from '../../utils/ToastHelper';
import axios from 'axios';

const FavoratePOComponent = ({ po = {} }) => {
  const [isFavorateItem, isFavorateItemSet] = useState(false);

  const handleAddToFavoratePOList = (item) => () => {
    const apiEndPoint = process.env.API_URL || "https://dev.taamid.com/api";

    axios.post(`${apiEndPoint}/favpo/`, { po: item }).then((response) => {
      if ([200, 201].includes(response?.status)) {
        isFavorateItemSet(true);
        showToast("success", "PO Added into favorate list!");
      }
    }).catch((error) => {
      showToast("success", "PO Could not Added into favorate list!");
    });
  };

  return (
    <button className=" d-flex align-items-center justify-content-between" onClick={handleAddToFavoratePOList(po?.id)}>
      {isFavorateItem ? (
        <img
        style={{ margin: '1px 4px -3px 3px ',
        objectFit: 'cover ', 
        display: 'block '
      
      }}
          src={redHeart}
          alt='Favorite Icon'
        />
      ) : (
        <img
          style={{ margin: '1px 4px -3px 3px ',
          objectFit: 'cover ', 
          display: 'block '
        
        }}
          src={heart}
          alt='Favorite Icon'
        />
      )}
    </button>
  )
}

export default FavoratePOComponent;