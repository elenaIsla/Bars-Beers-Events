import React, {Component} from 'react';

class FilterOptions extends Component {

    changeOption = (type, e) => {
      var val = e.target.value;
      this.props.changeOption(val, type);
    }
    render() {
      return (
        <div className="filter-options">
          <div className="filter-option">
            <label>draftBeer</label>
            <select id="draftBeer" value={this.props.draftBeer} onChange={this.changeOption.bind(this, 'draftBeer')}>
            {this.props.draftBeerOptions.map(function(option) {
              return ( <option key={option} value={option}>{option}</option> )
            })}
            </select>
            <label>bottleBeer</label>
            <select id="bottleBeer" value={this.props.bottleBeer} onChange={this.changeOption.bind(this, 'bottleBeer')}>
            {this.props.bottleBeerOptions.map(function(option) {
              return ( <option key={option} value={option}>{option}</option> )
            })}
            </select>
            <label>barType</label>
            <select id="barType" value={this.props.barType} onChange={this.changeOption.bind(this, 'barType')}>
            {this.props.barTypeOptions.map(function(option) {
              return ( <option key={option} value={option}>{option}</option> )
            })}
            </select>
            <label>price</label>
            <select id="price" value={this.props.price} onChange={this.changeOption.bind(this, 'price')}>
            {this.props.priceOptions.map(function(option) {
              return ( <option key={option} value={option}>{option}</option> )
            })}
            </select>
          </div>
        </div>
      );
    }
  };

  export default FilterOptions;