import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";

const Inicio = () => {
    return (
        <div className="container mt-5">
            <Card>
                <CardHeader>
                    <h2>Notas 🤯</h2>
                </CardHeader>
                <CardBody>
                    <span>
                        <strong>Notas 🤯</strong>,
                        es un sitio web donde puede almacenar diferentes tipos de notas según los módulos que se encuentre disponibles.
                        <br/>
                        Este sitio es un proyecto muy simple y básico para poner en práctica conociminetos que se adquieren en FrontEnd 
                        con <strong>React</strong> y en BackEnd con <strong>JavaScript</strong> (Entre otras herramientas).
                    </span>
                </CardBody>
                <CardFooter>
                    <span className="text-secondary float-end">
                        <i>Mini proyecto realizado por <strong>Nicolas Rosero C.</strong></i>
                    </span>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Inicio;