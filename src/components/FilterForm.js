
import React, {Component} from "react";
import FilterItems from '../components/FilterItems';
import appService from "../lib/AppService";



class FilterForm extends Component {
    
    state = {
      data: this.props.data,
      draftBeer: '',
      bottleBeer: '',
      address: '',
      price: '',
      listBeers: [],
      multiple: false
    }

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

  filterItems = (val, type) => {
     switch (type) {
      case 'draftBeer':
        this.setState({draftBeer: val});
        break;
      case 'bottleBeer':
        this.setState({bottleBeer: val});
        break;
      case 'address': 
        this.setState({address: val});
        break;
      case 'price':
        this.setState({price: val});
        break;
      default:
        break;
    }
  }
    
  changeOptionDraft = (e) => {
    var val = e.target.value;
    const type = "draftBeer";
    this.filterItems(val, type);
}
changeOptionBottle = (e) => {
    var val = e.target.value;
    const type = "bottleBeer";
    this.filterItems(val, type);
}
changeOptionNeighbourhood = (e) => {
    var val = e.target.value;
    const type = "address";
    this.filterItems(val, type);
}
changeOptionPrice = (e) => {
    var val = e.target.value;
    const type = "price";
    this.filterItems(val, type);
}

  render () {
    var filteredItems = this.props.data;
    var state = this.state;
    var filterProperties = ["draftBeer", "bottleBeer", "address", "price"];
    filterProperties.forEach((filterBy) => {
      var filterValue = state[filterBy];
      switch (filterBy){
        case "draftBeer":
                if(filterValue){
                    filteredItems = filteredItems.filter((item) => {
                        return item.draftBeer.indexOf(filterValue) !== -1;         
                    })
                };
        break;
        case "bottleBeer":
                if(filterValue){
                    filteredItems = filteredItems.filter((item) => {
                         return item.bottleBeer.indexOf(filterValue) !== -1;
                        })
                }
        break;
        case "address":
            if(filterValue){
                filteredItems = filteredItems.filter((item) => {
                    return item.address.neighbourhood === filterValue;
                })
            }
        break;
        case "price":
            if (filterValue) {
                filteredItems = filteredItems.filter((item) =>{
                return item[filterBy] === filterValue;
                })
            } 
        break;
        default:
        break;   
        }})


    const draftBeerArray = this.state.listBeers.map((beer) => {
        return beer.name;
    })
    const bottleBeerArray = this.state.listBeers.map((beer) => {
        return beer.name;
    })
    

    var addressArray = this.props.data.map((item) => { return item.address.neighbourhood });
    var priceArray = this.props.data.map((item) => { return item.price });

    draftBeerArray.unshift("");
    bottleBeerArray.unshift("");
    addressArray.unshift("");
    priceArray.unshift("");

    return (
      <div className="padding">
        <div className="filter-options padding">
          <div className="filter-option">
            <label><h3>DRAFT BEER</h3></label>
            <div className="styled-select blue semi-square">
                <select id="draftBeer" value={this.state.draftBeer} onChange={this.changeOptionDraft}>
                    {draftBeerArray.map((option,index) => {
                    return ( <option key={index} value={option}>{option}</option> )
                    })}
                </select>
            </div><br/>
            <label><h3>BOTTLE BEER</h3></label>
            <div className="styled-select blue semi-square">
            <select id="bottleBeer" value={this.state.bottleBeer} onChange={this.changeOptionBottle}>
            {bottleBeerArray.map((option, index) => {
              return ( <option key={index} value={option}>{option}</option> )
            })}
            </select>
            </div><br/>
            <label><h3>NEIBOURHOOD</h3></label>
            <div className="styled-select blue semi-square">
                <select id="address" value={this.state.address.neighbourhood} onChange={this.changeOptionNeighbourhood}>
                    {addressArray.map((option, index) => {  
                        return (
                    <option key={index} value={option}>{option}</option> )}
                    )}
                </select>
            </div><br/>
            <label><h3>PRICE</h3></label>
            <div className="styled-select blue semi-square">
            <select id="price" value={this.state.price} onChange={this.changeOptionPrice}>
          
            {priceArray.map((option, index) => {
                
                    switch (option) {
                      case "range1":   return  <option key={index} value={option}>1 - 2 €</option>;
                      case "range2": return  <option key={index} value={option}>2 - 3 €</option>;
                      case "range3":  return <option key={index} value={option}>3 - 4 €</option>;
                      case "": return <option key={index} value={option}> </option>;
                      default:      return "No range price added";
                    }
                 
                })}
              
    
            </select>
            </div>
          </div>
        </div>
  
        <div className="filter-form">
            <h3>YOUR SEARCH RESULT:</h3>
            {filteredItems.length ? (
              <FilterItems data={filteredItems} />
            ):(
              <div className="padding">
                <p>Ups! There is no bar with this filters.
                Be the first to create one!</p>
              </div>
            )}
            
            </div>
      </div>
    )
  }
};



/*if (val) {
      filteredItems = this.props.data.filter(function(item) {
        return item[type] === val;
      });
    } else {
      filteredItems = this.props.data;
    }*/
    //this.setState({data: filteredItems});

export default FilterForm;