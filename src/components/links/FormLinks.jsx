import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { db } from '../../firebase';
import { getDoc, doc } from "firebase/firestore";

import { FaLink, FaPen } from 'react-icons/fa';

// Contextos
import { useAuth } from '../../contexts/AuthContext';

const FormLinks = (props) => {

    // Usuario en sesion
    const { currentUser } = useAuth();

    // Valores iniciales del formulario
    const initValues = {
        link: '',
        webname: '',
        webdescription: ''
    };

    // Establecer valores al formulario
    const [values, setValues] = useState(initValues);

    // Obtener valores de los inputs
    const readInputs = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    // Función para el manejo del formulario
    const manejoForm = (e) => {
        e.preventDefault();

        // Validaciones
        if(!validarUrl(values.link)){
            return toast('Invalid URL 🚫', {
                type: 'info',
                autoClose: 2000
            });
        }

        props.addOrEditLink({...values, date: new Date()});
        setValues({...initValues});
    };

    // Función para consultar el sitio web por id
    const getWebById = async (id) =>{
        const website = await getDoc(doc(db, `${'usuarios/' + currentUser.uid + '/sitiosweb'}`, id));
        setValues({...website.data()})
    };

    useEffect(() => {
        // Validar el estado para crear o modificar un sitio web
        if(props.currentId === ''){
            setValues({...initValues});
        }else{
            getWebById(props.currentId);
        }
    }, [props.currentId]);

    // Validación del formulario
    const validarUrl = (str) => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
    };

    return (
        <div className='card card-body'>
            <form onSubmit={manejoForm}>
                <div className='form-group input-group'>
                    <div className='input-group-text'>
                        <FaLink />
                    </div>
                    <input type="text" 
                    className='form-control' 
                    name="link" 
                    id="link" 
                    placeholder="Ej: 
                    https://url.com" 
                    onChange={readInputs} 
                    value={values.link}
                    autoFocus
                    />
                </div>
                <div className='form-group input-group'>
                    <div className='input-group-text'>
                        <FaPen />
                    </div>
                    <input type="text" 
                    className='form-control' 
                    name="webname" id="webname" 
                    placeholder="Nombre del sitio web" 
                    onChange={readInputs} 
                    value={values.webname} 
                    />
                </div>
                <div className='form-group'>
                    <textarea className='form-control' 
                    style={{resize:"none"}}
                    name='webdescription' 
                    id='webdescription' 
                    rows='3' 
                    placeholder='Descripción del sitio web' 
                    onChange={readInputs} 
                    value={values.webdescription}
                    ></textarea>
                </div>
                <div className='card-footer d-grid gap-2'>
                    <button className='btn btn-primary'>
                        {props.currentId === '' ? 'Guardar' : 'Actualizar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormLinks;