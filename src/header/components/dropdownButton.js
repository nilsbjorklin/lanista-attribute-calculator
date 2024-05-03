import React, { useRef, useEffect } from 'react';
import './dropdownButton.css'

export default function DropdownButton({ buttonId, buttonText, items, changeToSelected = false, logging = false }) {
    if (logging) {
        console.log(buttonId);
        console.log(buttonText);
        console.log(items);
    }
    function toggleDropdown() {
        document.getElementById(buttonId).classList.toggle("show");
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    document.getElementById(buttonId).classList.remove("show");
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function executeAndClose(func) {
        toggleDropdown();
        func();
    }

    const ref = useRef(null);
    useOutsideAlerter(ref);
    const renderedItems = items?.map(item => <a id={item.id} key={item.id} onClick={() => executeAndClose(item.action)}>{item.name}</a>)

    return (
        <div className="dropdown" ref={ref}>
            <button onClick={() => toggleDropdown()} className={'dropbtn' + (changeToSelected ? ' select' : '')}>
                <p className='button-text'>{buttonText}</p>
                {changeToSelected && <img src="arrow-down.png" className='arrow-down' />}
            </button>
            <div id={buttonId} className='dropdown-content'>
                {renderedItems}
            </div>
        </div>
    );
}