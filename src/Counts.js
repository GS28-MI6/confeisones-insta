import React, { Component } from 'react'
import { connect } from "react-redux";
import { addOneToCount, startCount } from "./actions/postActions";

class Counts extends Component {
    constructor(props) {
        super(props);
        this.props.startCount()
    }

    render() {
        console.log(this.props.count)
        var counter = 0
        if (this.props.count > 0){
            counter = this.props.count
        }
        return (
            <div>
                <button type="button" style={{width: 100, height: 100}} onClick={() => this.props.addOneToCount(this.props.count)}>Add 1</button>
                <h1>{counter}</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    count: state.posts.count
});

//actions que utilizo en este componente
export default connect(mapStateToProps, { addOneToCount, startCount })(Counts);