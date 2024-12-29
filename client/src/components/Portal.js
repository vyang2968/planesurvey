import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
    const [portalElement] = useState(() => document.createElement('div'));
    useEffect(() => {
      document.body.appendChild(portalElement);
      return () => {
        document.body.removeChild(portalElement);
      };
    }, [portalElement]);
    return ReactDOM.createPortal(children, portalElement);
}

export default Portal;