import React, {Component} from 'react';

class FilterOptions extends Component {

    changeOption = (type, e) => {
        console.log(e)
      var val = e.target.value;
      this.props.changeOption(val, type);
    }

    // if (filterValue) {
    //     filteredItems = filteredItems.filter((item) =>{
    //       return item[filterBy] === filterValue;
    //     });
    //   }

    render() {
        console.log(this.props.priceOptions)
        console.log(this.props.draftBeerOptions)
        console.log(this.props.addressOptions)
      return (
        <div className="filter-options padding">
          <div className="filter-option">
            <label><h3>DRAFT BEER</h3></label>
            <div className="styled-select blue semi-square">
                <select id="draftBeer" value={this.props.draftBeer} onChange={this.changeOption.bind(this, 'draftBeer')}>
                    {this.props.draftBeerOptions.map((option,index) => {
                    return ( <option key={index} value={option}>{option}</option> )
                    })}
                </select>
            </div><br/>
            <label><h3>BOTTLE BEER</h3></label>
            <div className="styled-select blue semi-square">
            <select id="bottleBeer" value={this.props.bottleBeer} onChange={this.changeOption.bind(this, 'bottleBeer')}>
            {this.props.bottleBeerOptions && this.props.bottleBeerOptions.map((option, index) => {
              return ( <option key={index} value={option}>{option}</option> )
            })}
            </select>
            </div><br/>
            <label><h3>NEIBOURHOOD</h3></label>
            <div className="styled-select blue semi-square">
                <select id="address" value={this.props.address} onChange={this.changeOption.bind(this, 'address')}>
                    {this.props.addressOptions.map((option, index) => {  
                    if(!({option} === "")){
                        return (
                    <option key={index} value={option.neighbourhood}>{option.neighbourhood}</option> )}
                    })}
                </select>
            </div><br/>
            <label><h3>PRICE</h3></label>
            <div className="styled-select blue semi-square">
            <select id="price" value={this.props.price} onChange={this.changeOption.bind(this, 'price')}>
          
            {this.props.priceOptions.map((option, index) => {
                
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
      );
    }
  };

  export default FilterOptions;