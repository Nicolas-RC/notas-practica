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
    Button,
    Alert
} from "reactstrap";

// Contextos
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {

    const initValuesForm = {
        email: '',
        password: ''
    };

    const [loading, setLoagind] = useState(false);
    const [valuesForm, setValuesForm] = useState(initValuesForm);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Leer inputs del formulario para crear usuario
    const readInputsForm = (e) => {
        const { name, value } = e.target;
        setValuesForm({ ...valuesForm, [name]: value });
    }

    const { login } = useAuth();

    // Función para el manejo del formulario
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoagind(true);
            await login({ ...valuesForm });
            setValuesForm({ ...initValuesForm });
            navigate("/");
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    setError("El usuario no existe");
                    break;
                case "auth/wrong-password":
                    setError("Contraseña incorrecta");
                    break;
                case "auth/invalid-email":
                    setError("Ingrese un correo valido")
                    break;
                case "auth/internal-error":
                    setError("Ingrese una contraseña")
                    break;
                default:
                    setError("Ha ocurrido algo inesperado, intente más tarde");
                    break;
            }
        }
        setLoagind(false);
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <h1 className="text-center mb-4">Notas🤯</h1>
                    {error && <Alert color="danger" className="text-center">{error}</Alert>}
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
                            Ingresar
                        </Button>
                    </Form>
                </CardBody>
            </Card>
            <div className="w-100 text-center mt-3">
                <span>No estas registrado, puedes <Link to="/registro"><b>Registrarte aquí</b></Link></span>
            </div>
        </div>
    );
};

export default Login;