import React, {useRef, useEffect} from 'react';
import Noodel from 'noodel';
import 'noodel/dist/noodel.css';
import '../assets/css/noodel.css';

function NoodelTree(props){

    let display = useRef(null);


    const tree = new Noodel(props.data);

    useEffect(() => {
        tree.mount(display.current);
    }, [display]);

    return(
        <div ref={display}></div>
    );
}

export default NoodelTree;