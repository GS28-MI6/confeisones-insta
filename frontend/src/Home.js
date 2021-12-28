import React, { useState, useRef } from 'react'

import logo from "./assets/images/devilRojo.png";
import './assets/css/App.css';
import axios from "axios";
import Select from "react-select"

function Home() {
    const [stage, setStage] = useState("first");
    const [textoConf, setTexto] = useState("first");
    const [genero, setGenero] = useState("first");



    const confesionTexto = useRef();
    const confesionGenero = useRef();

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          color: 'black',
          backgroundColor: "#A9A9A9",
          "&:hover": {
            backgroundColor: "red",
          }
        }),
        menu: (provided, state) => ({
            ...provided,
            color: 'black',
            marginTop: "14px",
            padding: "0px",
            borderRadius: "0px",
            borderColor: "black",
            backgroundColor: '#A9A9A9',
          }),
        control: (provided, state) => ({
        ...provided,
        color: 'black',
        backgroundColor: '#A9A9A9',
        border: "2px",
        outline: "none",
        borderRadius: "0px",
        borderColor: '#930D0D',
        "&:hover": {
            borderColor: '#930D0D',
            }
        }),
        container: (provided, state) => ({
            ...provided,
            color: 'black',
            border: "2px",
            borderRadius: "0px",
            outline: "none",
            borderColor: '#930D0D',
            "&:hover": {
                borderColor: '#930D0D',
                }
            }),
        menuList: (provided, state) => ({
            ...provided,
            color: 'black',
            backgroundColor: '#A9A9A9',
            marginTop: '5px',
          }),
        container: (provided, state) => ({
            ...provided,
          backgroundColor: '#A9A9A9',
        }),
      }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("submit: " + genero);
        if(textoConf && genero){
            axios.post('http://localhost:4000/enviarMail', {texto: textoConf, genero: genero});
            confesionGenero.current = "";
            confesionTexto.current = "";
            setStage("last");
        }
    }

    const secondStage = (e) => {
        e.preventDefault();
        setTexto(confesionTexto.current.value);
        setStage("genero");
    }

    const returnHome = () => {
        setStage("first");
    }

    const handleSelectChange = (e) => {
        console.log(e)
        setGenero(e.value);
    }

    const options = [
        { value:"Hombre", label:"HOMBRE"},
        { value:"Mujer", label:"MUJER"},
        { value:"No especifico", label:"CHUPEN LIMONES"}
    ]

    const final = () => {
        const idx = Math.floor(Math.random() * frases.length);
        console.log(idx, frases.length);
        return (
            <div className="text">
                <p>{frases[idx].texto}</p>
                {frases[idx].firma ? (
                    <p className="right">{frases[idx].firma}</p>
                ):null}
            </div>
        )
    }

    const formStage = () => {
        switch (stage) {
            case "first":
                return (
                    <form className="text-area">
                            <textarea placeholder="Escribe tu confesión aquí..." ref={confesionTexto} name="title"/>
                            <button type="button" onClick={(e) => secondStage(e)} className="submit-button"> Enviar</button>
                    </form>
                );
            case "genero":
                return (
                    <form className="text-area selector">
                            <Select options={options} styles={customStyles} onChange={(e) => handleSelectChange(e)} name="genero" placeholder={"Selecciona un genero..."} className="select"/>
                            <button type="button" onClick={(e) => onSubmit(e)} className="submit-button"> Enviar</button>
                    </form>
                );
            case "last":
                return (
                    <div className="sent-text">
                        {final()}
                        <div>
                            <button type="button" onClick={() => returnHome()} className="return-button">Volver al inicio</button>
                        </div>
                    </div>
                )
        }
    }
    const frases = [
        {texto: "Su confesion ha sido enviada y se publicara tras ser validada por nuestros escla... muy bien pagados moderadores. Gracias por su paciencia.", firma: "-Con amor niñita"},
        {texto: "Su confesion ha sido enviada y sera publicada cuando uno de nuestros moderadores termine de revisarla como un buen muchacho." , firma: "-Atte, El admin"},
        {texto: "Gracias por su aporte, cada confesion nos acerca un 0,00001% a alimentar a nuestro programador." , firma: "-Atte, El admin"},
    ]
    return (
        <div className="container">
            <div className="area-container">
                <img src={logo} className="logo"/>
                {formStage()}
            </div>
        </div>
    )
}

export default Home;