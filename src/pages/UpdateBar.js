import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class UpdateBar extends Component {
    state = {
        barType: "",
        name: "",
        categoryType: "",
        street: "",
        neighbourhood: "",
        city: "", 
        draftBeer: [],
        bottleBeer: [],
        price: "",
        listBeers: [],
        error: null,
        isLoaded: false,  
    };

    componentDidMount() {
        this.getBar();
        this.getlistbeer();
    };

    getBar = () => {
        appService
        .getupdateBar(this.props.match.params)
            .then(bar => {
                this.setState({
                    // bar,
                barType: bar.barType,
                name: bar.name,
                categoryType: bar.category.categoryType,
                street: bar.address.street,
                neighbourhood: bar.address.neighbourhood,
                city: bar.address.city,
                draftBeer: bar.draftBeer,
                bottleBeer: bar.bottleBeer,
                price: bar.price,
                isLoaded: true,
                });
                console.log(bar);
                console.log( bar.address.street)
                console.log( bar.address.city)
            })
            .catch((error) => {
                this.setState({  
                    isLoaded: true,
                    error
                });
            });
    }
     

    getlistbeer = () => {
        appService
        .listBeers()
            .then(listBeers => {
                this.setState({
                listBeers,
                isLoaded: true,
                });
                console.log(listBeers);
            })
            .catch((error) => {
                this.setState({  
                    isLoaded: true,
                    error
                });
            }); 
    }
   

    handleFormSubmit = event => {
        event.preventDefault();
        const { barType, name, categoryType, street, neighbourhood, city, draftBeer, bottleBeer, price} = this.state;
        const { params } = this.props.match;
        appService
            .putupdateBar(params, barType, name, categoryType, street, neighbourhood, city, draftBeer, bottleBeer, price)
                .then(data => {
                    console.log(params)
                    console.log('ok');
                    this.props.history.push('/Home');
                })
                .catch(error => {
                    console.log('tu bar no se ha creado', error);
                });
        };

    handleChange = event => {
    console.log(event.target)
    const { name, value } = event.target;
    console.log(value);
    this.setState({ [name]: value });
    };

    handleCheckDraft = event => {
        const {value} = event.target;
        const {draftBeer} = this.state;
        console.log(value);
        this.setState({
            draftBeer: [...draftBeer, value]
        })
        console.log(draftBeer);
    }

    handleCheckBottle = event => {
        const {value} = event.target;
        const {bottleBeer} = this.state;
        console.log(value);
        this.setState({
            bottleBeer: [...bottleBeer, value]
        })
    }

    render() {
        const { barType, name, categoryType, street, neighbourhood, city, draftBeer, bottleBeer, price } = this.state;
        const {listBeers} = this.state;
        return  (
        <div className="padding">
            
            <form onSubmit={this.handleFormSubmit}>
            <label>TYPE OF BAR:</label>
            <div className="styled-select blue semi-square">
            <select 
                name="barType" 
                id="barType"
                value = {barType}
                onChange={this.handleChange}>
                <option value="Bar">Bar</option>
                <option value="Restaurante">Restaurante</option>
                <option value="Taberna">Taberna</option>
                <option value="Bodega">Bodega</option>
                <option value="Casa">Casa</option>
                <option value="Cockteleria">Cockteleria</option>
                <option value="Cafeteria">Cafeteria</option>
            </select>
            </div>

            <label>BAR NAME</label>
            <input 
                type="text" 
                name="name"
                value = {name}
                onChange={this.handleChange} 
                placeholder="Bar name" 
            /><br/>  

            <p className="color-grey">Address</p>
            <label>STREET:</label>
            <input 
                type="text" 
                name="street"
                value = {street} 
                placeholder="C/..."
                onChange={this.handleChange}
            />
            <label>CITY:</label>
            <div className="styled-select blue semi-square">
            <select 
                name="city" 
                id="city"
                value = {city}
                onChange={this.handleChange}>
                <option value="Barcelona">Barcelona</option>
                <option value="Almeria">Almería</option>
                <option value="Madrid">Madrid</option>
            </select>
            </div>
            <label>NEIGHBOURHOOD:</label>
            <div className="styled-select blue semi-square">
            <select 
                name="neighbourhood" 
                id="neighbourhood"
                value = {neighbourhood}
                onChange={this.handleChange}>
                <option value="Poble Nou">Poble Nou</option>
                <option value="Poble Sec">Poble Sec</option>
                <option value="Raval">Raval</option>
                <option value="Borne">Borne</option>
                <option value="Gótico">Gótico</option>
                <option value="Sarria">Sarria</option> 
            </select>  
            </div>   
            
            <label>Select Category</label>
            <div className="checkbox">
            <label>Cutre</label>
            <input 
                type="radio" 
                value="Cutre" 
                name="categoryType"
                checked={this.state.categoryType === 'Cutre'}
                onChange={this.handleChange}/>
            <label>Moderno</label>
            <input 
                type="radio" 
                value= "Moderno" 
                name="categoryType"
                checked={this.state.categoryType === 'Moderno'}
                onChange={this.handleChange}/>
            </div>
            <p className="color-grey">CURRENT BEER BRANDS:</p>
            <hr></hr>
            <p className="color-grey">Draft Beers:</p>
                {draftBeer && draftBeer.map((beer,index) => {
                    return (
                        <div key = {index}>
                            <p>{beer.name}</p>
                        </div>
                    )
                })}
            <p className="color-grey">Bottle Beers:</p>
                {bottleBeer && bottleBeer.map((beer,index) => {
                    return (
                        <div key = {index}>
                           <p> {beer.name}</p>
                        </div>
                    )
                })}

            <p className="color-grey">DO YOU WANT TO CHANGE YOUR BEERS?</p>
            <hr></hr>
            <p className="color-grey">Draft Beers</p>
                {listBeers && (listBeers.map((beer, index) => {
                    return (
                        <div key = {index}>
                            <input 
                                type="checkbox" 
                                name = {draftBeer}
                                value= { beer._id }
                                onChange={this.handleCheckDraft}
                            />
                            <img className="img-size" src= { beer.beerlogoImage } alt = {beer.name} />
                        </div>
                    )        
                }))}
            <p className="color-grey">Bottle Beers</p>
                {listBeers && (listBeers.map((beer, index) => {
                    return (
                        <div key = {index}>
                            <input 
                                type="checkbox" 
                                name = {bottleBeer} 
                                value= { beer._id }
                                onChange={this.handleCheckBottle}
                            />
                            <img className="img-size" src= { beer.beerlogoImage } alt = {beer.name} />
                        </div>
                    )        
                }))}
            <label>Price range</label><br/>
        
            
            <label>1 - 2 €</label>
            <input 
                type="radio" 
                value="range1" 
                name="price"
                checked={this.state.price === 'range1'}
                onChange={this.handleChange}/>
            <label>2 - 3 €</label>
            <input 
                type="radio" 
                value="range2" 
                name="price"
                checked={this.state.price === 'range2'}
                onChange={this.handleChange}/>
            <label>3 - 4 €</label>
            <input 
                type="radio" 
                value="range3" 
                name="price"
                checked={this.state.price === 'range3'}
                onChange={this.handleChange}/>
            
            <input className="review-button" type="submit" value="Update bar" /> 
        
            </form>
        </div>
    );
  }
}

export default withAuth(UpdateBar);