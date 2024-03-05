import React from "react";
import axios from "axios";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.productsAfterFilter = this.productsAfterFilter.bind(this);
    }

    state  = {
        price : 0 ,
        food : "",
        products : [],
        productsAfterFilter : [],
        combination : []
    }

    componentDidMount() {
        axios.get("http://localhost:9124/get-products").then(response => {
            console.log(response.data);
            this.setState({
                products : response.data

            })

        })
    }

    combination = () => {
        axios.get("http://localhost:9124/get-combination", {
            params : {
                price : this.state.price
            }
        }).then(response => {
            this.setState( {
                combination : response.data
            })
        })
    }

    async productsAfterFilter() {
        try {
            const response = await axios.get("http://localhost:9124/get-products-after-filter", {
                params: {
                    price: this.state.price,
                    food: this.state.food
                }
            });

            console.log(response.data);

            this.setState({
                productsAfterFilter: response.data
            }, () => {
                console.log("State has been updated:", this.state.productsAfterFilter);
                // ניתן לבצע פעולות נוספות לאחר עדכון הסטייט
            });
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    }


    valueChange = ( key,event) =>{
        let value = event.target.value;
        if (key === "price") {
            value = parseFloat(value);
        }
        this.setState({
            [key]: value
        });
        console.log(key, value);
    }




    render() {
        return(
            <div>
                <input onChange={(event) =>this.valueChange("food",event)} value={this.state.food} type={"text"} placeholder={"מה תרצה להזמין"} id={"placeholder"}/>
                <button onClick={this.combination} >  הרכבה </button>
                <button onClick={this.productsAfterFilter} id={"search"} חיפוש ></button>
                <input id={"range"} type={"range"} min={"0"} max={"200"} value={this.state.price}
                       onChange={(event) =>this.valueChange("price",event)} step={"1"}/>
                <div>
                    ₪  {this.state.price}
                </div>
                <div  id={"combination"}>
                    {this.state.productsAfterFilter.map((product) =>{
                        return( <div>
                            <button key={product.id}>
                            {product.name} {product.price}
                        </button> </div>)
                    })}
                </div>

                <div>
                    {this.state.combination.map((product) =>{
                        return(  <div>
                            <button key={product.id}>
                            {product.name} {product.price}
                        </button>
                        </div>)
                    })}
                </div>


            </div>


        )
    }
}
export default HomePage;