import React, {Component} from 'react';

class FilterOptions extends Component {

    changeOption = (type, e) => {
      var val = e.target.value;
      this.props.changeOption(val, type);
    }
    render() {
      return (
        <div className="filter-options padding">
          <div className="filter-option">
            <label>draftBeer</label>
            <div className="styled-select blue semi-square">
                <select id="draftBeer" value={this.props.draftBeer} onChange={this.changeOption.bind(this, 'draftBeer')}>
                    {this.props.draftBeerOptions.map((option,index) => {
                    return ( <option key={index} value={option}>{option}</option> )
                    })}
                </select>
            </div><br/>
            <label>bottleBeer</label><br/>
            <div className="styled-select blue semi-square">
            <select id="bottleBeer" value={this.props.bottleBeer} onChange={this.changeOption.bind(this, 'bottleBeer')}>
            {this.props.bottleBeerOptions && this.props.bottleBeerOptions.map((option, index) => {
              return ( <option key={index} value={option}>{option}</option> )
            })}
            </select>
            </div><br/>
            <label>barType</label><br/>
            <div className="styled-select blue semi-square">
                <select id="barType" value={this.props.barType} onChange={this.changeOption.bind(this, 'barType')}>
                    {this.props.barTypeOptions.map((option, index) => {
                    return ( <option key={index} value={option}>{option}</option> )
                    })}
                </select>
            </div><br/>
            <label>price</label><br/>
            <div className="styled-select blue semi-square">
            <select id="price" value={this.props.price} onChange={this.changeOption.bind(this, 'price')}>
            {this.props.priceOptions.map((option, index) => {
              return ( <option key={index} value={option}>{option}</option> )
            })}
            </select>
            </div>
          </div>
        </div>
      );
    }
  };

  export default FilterOptions;