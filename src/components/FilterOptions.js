import React, {Component} from 'react';

class FilterOptions extends Component {

    changeOption = (type, e) => {
        console.log(e)
      var val = e.target.value;
      this.props.changeOption(val, type);
    }
    render() {
        console.log(this.props.priceOptions)
        console.log(this.props.draftBeerOptions)
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
            <label><h3>BAR TYPE</h3></label>
            <div className="styled-select blue semi-square">
                <select id="barType" value={this.props.barType} onChange={this.changeOption.bind(this, 'barType')}>
                    {this.props.barTypeOptions.map((option, index) => {
                    return ( <option key={index} value={option}>{option}</option> )
                    })}
                </select>
            </div><br/>
            <label><h3>PRICE</h3></label>
            <div className="styled-select blue semi-square">
            <select id="price" value={this.props.price} onChange={this.changeOption.bind(this, 'price')}>
          
            {this.props.priceOptions.map((option, index) => {
              
              return ( 
              
              <option key={index} value={option}>{option}</option> 
              
              )
            })}
            </select>
            </div>
          </div>
        </div>
      );
    }
  };

  export default FilterOptions;