import React       from 'react';
import { connect } from 'react-redux';
import { 
  setUser,
  logoutUser,
  setProvider
 } from '../store/actions/auth';

import providers from '../auth/providers';

const { Component } = React;

const Alert = ({error}) => <div className="alert alert-danger"><strong>{'Wups! '}</strong>{error.toString()}</div>;

class Login extends Component {

  constructor() {
    super(...arguments);
    [ 'login', 'logout', 'error' ].forEach( n => this[n] = this[n].bind(this) );
    this.state = { error: null };
  }

  login(provider) {
    this.setState({error:null});
    this.props.setUser(provider.fields); // <-- dispatches to redux store 
    this.props.setProvider(provider.name);
  }

  logout() {
    this.props.logoutUser();
  }

  error(error) {
    this.setState( {error} );
  }

  render() {
    const {
      isLoggedIn,
      picture
    } = this.props;

    const {
      error
    } = this.state;

    const providerProps = {
      error: this.error,
      authenticated: this.login,
      notAuthenticated: this.logout
    };

    return( 
      <div>
        {error && <Alert error={error} />}
        {isLoggedIn
          ? <a onClick={this.logout}>{'Logout'}{picture && <img src={picture} />}</a>
          : <ul className="list-group">{[...providers].map( (p,i) => <ul className="list-group-item" key={i}>{p.ux(providerProps)}</ul>)}</ul>
        }
      </div>
      );
  }
}

const mapStateToProps    = s => { return { 
                                      isLoggedIn: s.auth.authenticated, 
                                      picture: s.auth.user.picture 
                                    }; };

const mapDispatchToProps = {  setUser, 
                              logoutUser, 
                              setProvider 
                            };

const ConnectedLogin  = connect( mapStateToProps, mapDispatchToProps )(Login);

module.exports =  ConnectedLogin;