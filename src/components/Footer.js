import React, { Component } from 'react'

class Footer extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mt-5">
            <small className="text-secondary">Created using Solidity and ReactJS with Truffle!</small>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
