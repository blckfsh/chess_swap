import React, { Component } from 'react'
import Identicon from 'identicon.js'

class Header extends Component {

  render() {
    return (
      <div className="container">
        <div className="row text-center justify-center">
          <div className="col-lg-12 mt-5">
              <h1 className="customTitle">Chess Swap</h1>
              <small className="text-secondary">An Exchange Marketplace Based On ERC-20 Tokens</small>
          </div>
          <div className="col-lg-4 offset-lg-4 align-self-center mt-3">
            <div class="card customAccount">
              <div class="card-body">
                <ul className="px-3">
                  <li className="text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-secondary">
                      <small id="account">{this.props.account}</small>
                    </small>
                    { this.props.account ?
                      <img
                        className="ml-2"
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                      />
                      : <span></span>
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
