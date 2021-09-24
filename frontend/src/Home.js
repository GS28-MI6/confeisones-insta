import React, { Component } from 'react'
import { connect } from "react-redux";
import { addOneToCount, startCount } from "./actions/postActions";
import logo from "./assets/images/devilRojo.png";
import './assets/css/App.css';
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let title = this.title.value;
        console.log(title);
        if(this.title.value){
            //axios.post('http://ec2-54-94-81-90.sa-east-1.compute.amazonaws.com:4000/enviarMail', {texto: title});
            this.title.value = "";
            this.setState({sent: true});
        }
    }

    returnHome() {
        this.setState({sent: false});
    }

    render() {
        const { sent } = this.state;
        const texto = "Su confesion ha sido enviada y se publicara tras ser validada por nuestros escla... muy bien pagados moderadores. Gracias por su paciencia."
        const firma = "-Con amor niñita"
        return (
            <div className="container">
                <div className="area-container">
                    <img src={logo} className="logo"/>
                    {!sent ? (
                        <form className="text-area">
                            <textarea placeholder="Escribe tu confesión aquí..." ref={(c) => this.title = c} name="title"/>
                            <button type="submit" onClick={(e) => this.onSubmit(e)} className="submit-button"> Enviar</button>
                        </form>
                    ) : (
                        <div className="sent-text">
                            <div className="text">
                                <p>{texto}</p>
                                <p className="right">{firma}</p>
                            </div>
                            <div>
                                <button type="button" onClick={(e) => this.returnHome(e)} className="return-button">Volver al inicio</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    count: state.posts.count
});

//actions que utilizo en este componente
export default connect(mapStateToProps, { addOneToCount, startCount })(Home);