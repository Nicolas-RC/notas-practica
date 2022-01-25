import React, { useState, useEffect } from "react";

import { toast } from 'react-toastify';
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import { db } from "../../firebase";
import { addDoc, collection, query, onSnapshot, deleteDoc, doc, updateDoc, orderBy } from "firebase/firestore";

// Contextos
import { useAuth } from "../../contexts/AuthContext";

// Componentes
import FormLinks from "./FormLinks";

const Links = () => {

    // Usuario en sesion
    const { currentUser } = useAuth();

    // Estado inicial para mostrar los sitios web
    const [links, setLinks] = useState([]);

    // Estado para saber si se modifica o se crea un link
    const [currentId, setCurrentId] = useState('');

    // Función para almacenar o modificar un recurso
    const addOrEditLink = async (linkObjects) => {
        // Validar si se crea o se modifica un recurso
        if (currentId === '') {
            try {
                await addDoc(collection(db, `${'usuarios/' + currentUser.uid + '/sitiosweb'}`), linkObjects);
                toast('Nuevo link agrgado ✔️', {
                    type: 'success',
                    autoClose: 3000
                });
            } catch (error) {
                console.log(error.message);
            }
        } else {
            try {
                await updateDoc(doc(db, `${'usuarios/' + currentUser.uid + '/sitiosweb'}`, currentId), linkObjects);
                toast('Link actualizado ✔️', {
                    type: 'info',
                    autoClose: 3000
                });
            } catch (error) {
                console.log(error.message);
            }
            setCurrentId('');
        }
    };

    // Función para mostrar todos los sitios web añadidos
    const getWebSites = () => {
        const q = query(collection(db, `${'usuarios/' + currentUser.uid + '/sitiosweb'}`), orderBy('date'));
        onSnapshot(q, (querySnapshot) => {
            const docsLinks = [];
            querySnapshot.forEach((doc) => {
                docsLinks.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docsLinks);
        });
    };

    // Actualizar los sitios en pantalla
    useEffect(() => {
        getWebSites();
    }, []);

    // Función para eliminar un sitio web
    const deleteWeb = async (id) => {
        if (window.confirm('Está segur@?')) {
            await deleteDoc(doc(db, `${'usuarios/' + currentUser.uid + '/sitiosweb'}`, id));
            toast('Link eliminado ✔️', {
                type: 'info',
                autoClose: 3000
            })
        }
    };

    return (
        <div>
            <FormLinks {...{ addOrEditLink, currentId, links }} />
            <br />
            <h1>Links sitios web</h1>
            <div className='col-md-12'>
                {links.map((infoLink) => (
                    <div className='card mb-1' key={infoLink.id}>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                                <h4>{infoLink.webname}</h4>
                                <div>
                                    <FaTrashAlt className='material-icons text-danger'
                                        title='Eliminar link'
                                        style={{ cursor: "pointer" }}
                                        onClick={() => deleteWeb(infoLink.id)} />
                                    <FaEdit className='material-icons text-secondary'
                                        title='Actualizar link'
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setCurrentId(infoLink.id)} />
                                </div>
                            </div>
                            <span>{infoLink.webdescription}</span>
                            <br />
                            <a href={infoLink.link} target='_blank' rel="noreferrer">
                                Ir a {infoLink.webname}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Links;