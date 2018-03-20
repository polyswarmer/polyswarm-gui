// Vendor imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Bounty imports
import Button from '../Button';
// Component imports
import HttpAccount from './http';
import strings from './strings';
import './styles.css';

class ModalPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: false,
      open: false,
      unlocking: false,
      error: false,
      password: '',
      address: '',
    };

    this.onAccountSet = this.onAccountSet.bind(this);
    this.onChangeStore = this.onChangeStore.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onUnlockClick = this.onUnlockClick.bind(this);
    this.onUnlock = this.onUnlock.bind(this);
  }

  render() {
    const { props: { accounts } } = this;
    const { state: { open, unlocking, error, password, address, store } } = this;
    return (
      <div className='ModalPassword'>
        {open && (
          <React.Fragment>
            <div className='ModalBackground'
              onClick={this.onCloseClick}>
            </div>
            <div className='ModalContent'>
              <header className='ModalContentHeader'>
                {strings.header}
              </header>
              <form>
                <label htmlFor='address'>
                  {strings.address}
                </label>
                <select id='address'
                  value={address}
                  onChange={this.onChangeAddress}>
                  {
                    accounts.map((account) => {
                      return(
                        <option key={account}
                          value={account}>
                          {account}
                        </option>
                      );
                    })
                  }
                </select>
                <label htmlFor='password'>
                  {strings.password}
                </label>
                <input id='password'
                  type='password'
                  value={password}
                  onChange={this.onChangePassword}/>
                <span>
                  <input id='store'
                    type='checkbox'
                    value={store}
                    onChange={this.onChangeStore}/>
                  <label htmlFor='store'>
                    {strings.store}
                  </label>
                </span>
                <div className='ModalError'>
                  {error && (
                    strings.error
                  )}
                </div>
              </form>
              <span className='Modal-Button-Bar'>
                <Button
                  flat
                  disabled={unlocking}
                  onClick={this.onUnlockClick}>
                  {strings.unlock}
                </Button>
                <Button
                  flat
                  cancel
                  disabled={unlocking}
                  onClick={this.onCloseClick}>
                  {strings.cancel}
                </Button>
              </span>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }

  onAccountSet() {
    const { props: { accountSet }, state: {store} } = this;
    if (accountSet) {
      accountSet(store);
    }
  }

  onChangeStore(event) {
    this.setState({store: event.checked});
  }

  onChangePassword(event) {
    this.setState({password: event.target.value});
  }

  onChangeAddress(event) {
    this.setState({address: event.target.value});
  }

  onCloseClick() {
    const { state: { unlocking } } = this;
    if (!unlocking) {
      this.close();
    }
  }

  onUnlockClick() {
    const { props: { address, password } } = this;
    this.onUnlock(address, password);
  }

  onUnlock(address, password) {
    const { props: { url } } = this;
    if (url) {
      this.setState({unlocking: true, error: false});
      const http = HttpAccount(url);
      http.unlockAccount(address, password)
        .then(success => {
          this.setState({unlocking: false, error: !success});
          if (success) {
            this.onAccountSet();
            this.close();
          }
        });
    }
  }

  open() {
    this.setState({open: true});
  }

  close() {
    this.setState({open: false});
  }
}

ModalPassword.proptypes = {
  url: PropTypes.string,
  accounts: PropTypes.array,
  accountSet: PropTypes.func,
};
export default ModalPassword;