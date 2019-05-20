import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class CreateBar extends Component {
    state = {
        barType: "",
        name: "",
        categoryType: "",
        street: "",
        neighbourhood: "",
        city: "",
        draftBeer: [],
        bottleBeer:[],
        price: "",
        listBeers: []   
    };

    componentDidMount() {
        appService
        .listBeers()
            .then(listBeers => {
                this.setState({
                listBeers,
                isLoaded: true,
                });
            })
            .catch((error) => {
                this.setState({  
                    isLoaded: true,
                    error
                });
            }); 
    };

    handleFormSubmit = event => {
    event.preventDefault();
    const { barType, name, categoryType, street, neighbourhood, city, draftBeer, bottleBeer, price} = this.state;
    appService.createBar({ barType, name, categoryType, street, neighbourhood, city, draftBeer, bottleBeer, price })
        .then(data => {
            this.props.history.push('/Home');
        })
        .catch(error => {
            console.log(draftBeer, bottleBeer);
            console.log('tu bar no se ha creado', error);
        });
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleCheckDraft = event => {
        const {value} = event.target;
        const {draftBeer} = this.state;
        this.setState({
            draftBeer: [...draftBeer, value]
        })
    }

    handleCheckBottle = event => {
        const {value} = event.target;
        const {bottleBeer} = this.state;
        this.setState({
            bottleBeer: [...bottleBeer, value]
        })
    }

    render() {
        const { barType, name, street, neighbourhood, city, draftBeer, bottleBeer } = this.state;
        const {listBeers} = this.state;
        return (
        <div className="padding">
            
            <form onSubmit={this.handleFormSubmit}>
            <label><h3>Type of bar:</h3></label>
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

            <label><h3>Bar name</h3></label><br/>
            <input 
                type="text" 
                name="name"
                value = {name}
                onChange={this.handleChange} 
                placeholder="Bar name" 
            /><br/>       
            
            <label><h3>Select Category</h3></label><br/>
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
                value="Moderno" 
                name="categoryType"
                checked={this.state.categoryType === 'Moderno'}
                onChange={this.handleChange}/>
        
            
            <h3>Address</h3>
            <label>Street:</label>
            <input 
                type="text" 
                name="street"
                value = {street} 
                placeholder="C/..."
                onChange={this.handleChange}
            />
            <label>City:</label>
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
            <label>Neighbourhood:</label>
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

            </div>

            <h3>Draft Beers</h3>
                {listBeers.map((beer, index) => {
                    return (
                        <div className="beer-radio" key = {index}>
                            <div className="center"><input 
                                type="checkbox" 
                                name = {draftBeer}
                                value= { beer._id }
                                onChange={this.handleCheckDraft}
                            />
                            </div>
                          <div>  
                              <img width = "100" className="img-size" src= { beer.beerlogoImage } alt = {beer.name} />
                          </div>
                        </div>
                    )        
                })}
            <h3>Bottle Beers</h3>
                {listBeers.map((beer, index) => {
                    return (
                        <div className="beer-radio" key = {index}>
                            <div className="center"><input 
                                type="checkbox" 
                                name = {bottleBeer} 
                                value= { beer._id }
                                onChange={this.handleCheckBottle}
                            />
                            </div>
                            <div><img width = "100" className="img-size" src= { beer.beerlogoImage } alt = {beer.name} /></div>
                        </div>
                    )        
                })}
            <label><h3>Price range</h3></label><br/>
            <div>
            <label>1 - 2 €</label>
            <input 
                type="radio" 
                value="range1" 
                name="price"
                checked={this.state.price === 'range1'}
                onChange={this.handleChange}/>
                </div>
           <div>
            <label>2 - 3 €</label>
            <input 
                type="radio" 
                value="range2" 
                name="price"
                checked={this.state.price === 'range2'}
                onChange={this.handleChange}/>
            </div>
            <div>
            <label>3 - 4 €</label>
            <input 
                type="radio" 
                value="range3" 
                name="price"
                checked={this.state.price === 'range3'}
                onChange={this.handleChange}/>
            </div>
            
            <input className="review-button" type="submit" value="Create bar" /> 
        
            </form>
        </div>
    );
  }
}

export default withAuth(CreateBar);