import React, { useState, useEffect } from "react";
import { addDoc, collection, query, deleteDoc, updateDoc, doc, onSnapshot, orderBy } from "firebase/firestore";
import { Card, CardBody } from "reactstrap";
import { toast } from 'react-toastify';

import { FaTrashAlt, FaEdit } from "react-icons/fa";

import { db } from "../../firebase";

// Contextos
import { useAuth } from "../../contexts/AuthContext";

// Componentes
import FormNotas from "./FormNotas";

const Notas = () => {

    // Usuario en sesion
    const { currentUser } = useAuth();

    // Estado inicial para mostrar las notas
    const [notas, setNotas] = useState([]);

    // Estado para saber si se modifica o se crea una nota
    const [currentIdNota, setCurrentIdNota] = useState('');

    // Función para modificar o actualizar una nota
    const addOrEditNota = async (NotasObject) => {
        // Validar si se crea un documento o se modifica
        if (currentIdNota === '') {
            try {
                await addDoc(collection(db, `${'usuarios/' + currentUser.uid + '/notas'}`), NotasObject);
                toast('Nota agregada ✔️', {
                    type: 'success',
                    autoClose: 3000
                });
            } catch (error) {
                console.log(error.message);
            }
        } else {
            try {
                await updateDoc(doc(db, `${'usuarios/' + currentUser.uid + '/notas'}`, currentIdNota), NotasObject);
                toast('Nota actualizada ✔️', {
                    type: 'info',
                    autoClose: 3000
                });
            } catch (error) {
                console.log(error.message);
            }
            setCurrentIdNota('');
        }
    };

    // Función para obtener las notas
    const getNotas = () => {
        const q = query(collection(db, `${'usuarios/' + currentUser.uid + '/notas'}`), orderBy('date'));
        onSnapshot(q, (querySnapshot) => {
            const arrayNotas = [];
            querySnapshot.forEach((doc) => {
                arrayNotas.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setNotas(arrayNotas);
        });
    };

    // Actualizar las notas en tiempo real
    useEffect(() => {
        getNotas();
    }, []);

    // Función para eliminar una nota
    const deleteNota = async (id) => {
        if (window.confirm('Está segur@?')) {
            await deleteDoc(doc(db, `${'usuarios/' + currentUser.uid + '/notas'}`, id));
            toast('Nota eliminada ✔️', {
                type: 'info',
                autoClose: 3000
            });
        }
    };

    return (
        <div>
            <FormNotas {...{ addOrEditNota, currentIdNota }} />
            <br />
            <h1>Notas ✏️</h1>
            <div className="col-md-12">
                {
                    notas.map((infoNota) => (
                        <Card className="mb-1" key={infoNota.id}>
                            <CardBody>
                                <div className='d-flex justify-content-between'>
                                    <h4>{infoNota.titulo}</h4>
                                    <div>
                                        <FaTrashAlt className='text-danger'
                                            title='Eliminar nota'
                                            style={{ cursor: "pointer" }}
                                            onClick={() => deleteNota(infoNota.id)} />
                                        <FaEdit className='text-secondary'
                                            title='Actualizar nota'
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setCurrentIdNota(infoNota.id)} />
                                    </div>
                                </div>
                                <span>{infoNota.descripcion}</span>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        </div>
    );

};

export default Notas;