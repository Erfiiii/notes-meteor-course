import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer} from 'meteor/react-meteor-data'

export const PrivateHeader = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={() => props.handleLogout()}>Logout</button>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout : PropTypes.func.isRequired
};

export default createContainer(()=>{
  return  {
    handleLogout: ()=>{
      Accounts.logout()
    }
  }
},PrivateHeader)

