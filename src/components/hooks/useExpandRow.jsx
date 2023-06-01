

import  React ,{ useState, useEffect, useRef } from "react";



function  useExpandRow ({
    initialOpen = false,
    ref = null,


}) {
    const  [open, setOpen] = useState(false);
    const  rowRef = useRef(null);

    useEffect(() => {
        const  handleOutsideClick = (e) => {
            if (rowRef.current && !rowRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }
    , []);

    return { open, setOpen, rowRef };
  }

export default useExpandRow;

