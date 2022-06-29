import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodos } from '../Reducer';
import './styles.css'

const Header = () => {

    const [text, setText] = useState('')

    function handleText (e) {
        setText(e.target.value)
    }
    
    const dispatch = useDispatch()

    function handleAdd () {
        if (text !== '') {
        dispatch(addTodos(text))
        }
        setText('')
    }

    return (
        <>
        <div className='header'>
            <input onChange={handleText} value={text} className='input'></input>
            <button onClick={handleAdd} className='addButton'>Add</button>
        </div>
        </>
    );
};

export default Header;