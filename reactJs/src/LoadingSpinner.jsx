import React, { useState, useEffect } from "react";
import ClayIcon from '@clayui/icon';
import Loader,{ThreeDots} from 'react-loader-spinner';


const LoadingSpinner = (param) => {

    useEffect(() => {
    }, []);

    

      
    return (
        <div>
          <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
      <ThreeDots color="#008fb6" height="100" width="100" />
    </div> 

        </div>
    );
};

export default LoadingSpinner;
