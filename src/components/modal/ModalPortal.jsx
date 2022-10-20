import React, { useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

const ModalPortal = ({ children, wrapperId='modal-portal'}) => {
    const [wrapperElement, setWrapperElement] = useState(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element);
        return () => {
            if (systemCreated && element.parentNode) {
              element.parentNode.removeChild(element);
            }
          }
    }, [wrapperId])

    if (wrapperElement === null) return null;
    return createPortal(children, wrapperElement)
}

const createWrapperAndAppendToBody = (wrapperId) => {
    let wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

export default ModalPortal