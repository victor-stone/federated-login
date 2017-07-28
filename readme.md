# A workbench for testing Cognito Federated Idenities

You can now import this package and integrate several pieces into any app.


## Create a config object to initiate

```javascript

import FL from 'federated-login';

const myConfig = {
  REGION: 'us-west-2', // <--- REPLACE
  IDENTITY_POOL_ID: 'us-west-2:123456677-6bdb-4e28-b9a2-fafacccceefef22', // <--- REPLACE

  Facebook: {
    clientId: '122345677888999', // <--- REPLACE
    scope: 'public_profile,email',
    fields: 'email,first_name,last_name,picture',
    buttonOptions: {
      size: 'large',
      type: ['login_with','continue_with'][0],
      profilePick: false,
      friends: false,
      width: undefined,
      autoLogout: false
    }
  },

  Google: {
    clientId: '1234566789-h8sjf845lqo4fia4djrs44c622408sgf.apps.googleusercontent.com', // <--- REPLACE
    scope: 'profile email'
  }
};

// Initialize the AWS and federated authenticators 
// you do this one time (e.g. in App.jsx

FL.providers.config = myConfig;

```

## React

If you have a React app you can use the components

```jsx

<nav>
   <ul className="navbar">
    <li><FL.Login /></li>  //<-- a login/logout link that invokes the popup
   ...
   </ul>
   <FL.Login.Popup /> // <-- the actual popup 
</nav>

```

## Redux

If you a Redux app you can grab the individual reducers and combine them with yours into your store


```javascript

const { auth, modal, profile } = FL.rootReducer;

const reducers = {
  auth,
  modal,
  profile,

  myOtherReducer,
  myYetAnotherReducer,
};

// Get the actions 

const { auth: {
           setCredentials,
           getCredentials
         },
        modal: {
           openModal,
           closeModal
        },
        profile: {
           setProfile
        }
 } = FL.actions;

// (boilerplate Redux glue:)
const mapStateToProps => s => ({ profile: s.profile });
const mapDispatchToProps = { setProfile };

comp MyComponent = connect(mapStateToProps,mapDispatchToProps)(_MyComponent)

```

## Other Providers

To create your provider that isn't covered here, derive from idProvider and 'add' your derivation


```javascript

import {
  IdProvider,
  providers
} from 'federated-login';

class AmazonLogin from IdProvider {
  // derivations must implement:
  // see Facebook and Google provider for details

  get loginDescriptor() {
  }

  ux(props) { 
    return props => <SomeReactComponent {...props} />
  }

}

providers.add( new AmazonLogin() )
````

The thinking as of this writing:
  - Mainting your own user database and all the interactions (lost password, email confirmation, etc.) is a huge pain
  - AWS is currently in beta with a service that encapsulates 100% of that (including UI)
  - BUT.... that module is not ready and won't be stable until (at least) early 2018 by my guess
  - So for now, we just allow log ins from social media sites

SO - there is NO Cognito User Pools used here. AT ALL. This is strictly for apps that are totally cool with social media (and other 3rd party identity providers) being the way to log in.

## Releases

I'm experimenting with using tags (aka releases) as a tutorial mechanism. Each 'release' will add a little more functionality so you can easily isolate the functionality. See the current releases [here](https://github.com/victor-stone/federated-login/releases)

## Notes

### SDK

The SDK file in public/js was created using the [SDK Builder](https://sdk.amazonaws.com/builder/js/) tool. It has a tiny subset of the full aws-sdk. That will get added to as the functionality expands

### AWS Requirements

This only works if you have created a Cognito Federedated Identities pool from the Cognito service. Once you have that pool up and running you'll need to set it up [as described here](http://docs.aws.amazon.com/cognito/latest/developerguide/external-identity-providers.html)

### Hard coded IDs

As of this writing the client IDs of my apps (aws, google and facebook) are all hard wired into the example. 


