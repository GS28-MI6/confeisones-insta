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
        var title = this.title.value;
        console.log(title);
        axios.post('http://localhost:4000/enviarMail', {texto: title});
        this.title.value = "";
    }

    render() {
        return (
            <div className="container">
                <div className="area-container">
                    <img src={logo} className="logo"/>
                    <form className="text-area">
                        <textarea placeholder="Escribe tu confesión aquí..." ref={(c) => this.title = c} name="title"/>
                        <button type="submit" onClick={(e) => this.onSubmit(e)} className="submit-button"> Enviar</button>
                    </form>
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