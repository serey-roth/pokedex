import React, { useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

//a wrapper portal that allows the element inside to appear
//outside of its container hierarchy
//for example, we can wrap a modal in a portal element so 
//it can show up on top of everything else
const ModalPortal = ({ children, wrapperId='modal-portal'}) => {
    const [wrapperElement, setWrapperElement] = useState(null);

    //before React paints the ui onto the DOM
    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element);
        //when the element is unmounted, we want to remove the 
        //wrapper element we created
        return () => {
            if (systemCreated && element.parentNode) {
              element.parentNode.removeChild(element);
            }
          }
    }, [wrapperId])

    if (wrapperElement === null) return null;
    return createPortal(children, wrapperElement)
}

//the created element will be added right after the 'root' element
//so the element inside the portal will be shown on top of the 'root'
//element
const createWrapperAndAppendToBody = (wrapperId) => {
    let wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

export default ModalPortal