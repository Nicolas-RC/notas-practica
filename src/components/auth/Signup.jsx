import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Componentes de reactstrap
import { 
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

// Contextos
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {

    const initValuesForm = {
        email: '',
        password: ''
    };

    const [loading, setLoagind] = useState(false);
    const [valuesForm, setValuesForm] = useState(initValuesForm);
    const navigate = useNavigate();

    const { signUp } = useAuth();

    // Leer inputs del formulario para crear usuario
    const readInputsForm = (e) => {
        const {name, value} = e.target;
        setValuesForm({...valuesForm, [name]: value});
    }

    // Función para el manejo del formulario
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoagind(true);
            await signUp({...valuesForm});
            setValuesForm({...initValuesForm});
            navigate("/inicio/notas");
        }catch (error) {
            console.log(error.message);
        }
        setLoagind(false);
    };


    return (
        <div>
            <Card>
                <CardBody>
                    <h2 className="text-center mb-4">Registrate en Notas🤯</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <Label>Correo electrónico</Label>
                            <Input 
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Correo electrónico"
                                autoFocus
                                onChange={readInputsForm}
                                value={valuesForm.email}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Contraseña</Label>
                            <Input 
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Contraseña"
                                onChange={readInputsForm}
                                value={valuesForm.password}
                            />
                        </FormGroup>
                        <Button type="submit" disabled={loading} className="w-100" color="primary">
                            Registrarse
                        </Button>
                    </Form>
                </CardBody>
            </Card>
            <div className="w-100 text-center mt-3">
                <span>Si ya te encuentras registrado puedes <Link to="/"><b>Iniciar sesión</b></Link></span>
            </div>
        </div>
    );
};

export default Signup;