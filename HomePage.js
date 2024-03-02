import React from "react";
import axios from "axios";

class HomePage extends React.Component {
    state  = {
        valueOfRange : "" ,
        valueOfText : ""

    }

    componentDidMount() {
        axios.get('http://localhost:3001/')
            .then(response => {
                console.log(response.data);
            })
    }

    valueChange = ( key,event) =>{
        this.setState( {
            [key] : event.target.value
        })
    }




    render() {
        return(
            <div>
                <input onChange={(event) =>this.valueChange("valueOfText",event)} value={this.state.valueOfText} type={"text"} placeholder={"מה תרצה להזמין"} id={"placeholder"}/>
                <button id={"search"}> חיפוש </button>
                <input id={"range"} type={"range"} min={"0"} max={"200"} value={this.state.valueOfRange}
                       onChange={(event) =>this.valueChange("valueOfRange",event)} step={"1"}/>
                <div>
                    ₪  {this.state.valueOfRange}
                </div>


            </div>


        )
    }
}
export default HomePage;