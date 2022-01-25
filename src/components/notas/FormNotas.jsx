import React, { useState, useEffect } from "react";

// Componentes reactstrap
import { Card, 
    CardFooter, 
    Form, 
    FormGroup, 
    InputGroupText, 
    InputGroup, 
    Input,
    Button 
} from "reactstrap";

import  { FaStickyNote } from 'react-icons/fa';

import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

// Contextos
import { useAuth } from "../../contexts/AuthContext";

const FormNotas = (props) => {
    
    // Usuario en sesion
    const { currentUser } = useAuth();

    // Valores iniciales del formulario
    const initValuesNotas = {
        titulo: '',
        descripcion: ''
    };

    // Establecer valores iniciales
    const [valuesNotas, setValuesNotas] = useState(initValuesNotas);

    // Obtener los valores de los Input
    const readValuesInput = (e) => {
        const {name, value} = e.target;
        setValuesNotas({...valuesNotas, [name]: value});
    };

    // Manejo del formualario
    const formNotas = (e) => {
        e.preventDefault();

        // Llamado a la función para crear o editar una nota
        props.addOrEditNota({...valuesNotas, date: new Date()});
        setValuesNotas({...initValuesNotas});
    };

    // Función para consultar la nota por id y llenar el formulario
    const getNotaId = async (id) => {
        const notaId = await getDoc(doc(db, `${'usuarios/' + currentUser.uid + '/notas'}`, id));
        setValuesNotas({...notaId.data()});
    };

    // Validar si se crea o se modifica una nota
    useEffect(() => {
        if(props.currentIdNota === '') {
            setValuesNotas({...initValuesNotas});
        }else{
            getNotaId(props.currentIdNota);
        }
    }, [props.currentIdNota]);

    return (
        <div>
            <Card className="card-body">
                <Form onSubmit={formNotas}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText>
                                <FaStickyNote/>
                            </InputGroupText>
                            <Input type="text"
                                name="titulo"
                                id="titulo"
                                placeholder="Título de la nota"
                                autoFocus
                                onChange={readValuesInput}
                                value={valuesNotas.titulo} />
                        </InputGroup>
                        <InputGroup>
                            <Input type="textarea"
                                name="descripcion"
                                id="descripcion"
                                placeholder="Descripción de la nota"
                                rows='3'
                                onChange={readValuesInput}
                                value={valuesNotas.descripcion} />
                        </InputGroup>
                        <CardFooter className='card-footer d-grid gap-2'>
                            <Button color="primary">
                                {props.currentIdNota === '' ? 'Guardar' : 'Actualizar'}
                            </Button>
                        </CardFooter>
                    </FormGroup>
                </Form>
            </Card>
        </div>
    );
};

export default FormNotas;