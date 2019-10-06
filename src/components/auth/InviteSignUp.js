import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Loader } from 'semantic-ui-react'
import Brand from '../../resources/logo.png';
import { connect } from 'react-redux';
import { signUp, getInvite } from '../../store/actions/authActions';

class InviteSignUp extends Component {
  state = {
    firstName: null,
    lastName: null,
    password: '',
    retypePassword: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const firstName = this.state.firstName ? this.state.firstName : this.props.inviteData.data.firstName;
    const lastName = this.state.lastName ? this.state.lastName : this.props.inviteData.data.lastName;

    console.log(firstName, ' ', lastName);

    this.props.signUp({
      ...this.state, 
      firstName,
      lastName,
      email: this.props.inviteData.data.email, 
      inviteID: this.props.match.params.inviteID, 
      designation: this.props.inviteData.data.designation
    });
  }


  render() {
    const { auth, authError, inviteData } = this.props;

    //Return to dashboard when the user is logged in
    if (auth.uid) return <Redirect to='/' />

    //Fetch invitation information
    const { inviteID } = this.props.match.params;

    //Check inviteID is exisits in the URL
    if (inviteID) {
      //systemUserID exsists. Getting invite data
      if (!inviteData) {
        this.props.getInvite(inviteID);
      }
    } else {
      //System user ID does not exist. Redirecting to root
      return <Redirect to='/' />
    }



    if (!inviteData) {
      return <Loader active size='medium'>Loading</Loader>
    } else {
      const { data, status } = inviteData;

      //Invalid invitationID. Redirecting to root
      if(!status){
        return <Redirect to='/' />
      }
      
      const { firstName, lastName, password, retypePassword } = this.state;

      return (
        <div className='login-form'>
          {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}
          <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src={Brand} /> Create Account
          </Header>
              {
                authError ?
                  <Message negative>
                    <Message.Header>Signup failed</Message.Header>
                    <p>{authError}</p>
                  </Message>
                  :
                  null
              }
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid icon='user'
                    iconPosition='left'
                    placeholder='Frist Name'
                    id='firstName'
                    onChange={this.handleChange}
                    value={firstName || data.firstName}
                  />
                  <Form.Input
                    fluid icon='user'
                    iconPosition='left'
                    placeholder='Last Name'
                    id='lastName'
                    onChange={this.handleChange}
                    value={lastName || data.lastName}
                  />
                  <Form.Input
                    fluid icon='paper plane'
                    iconPosition='left'
                    placeholder={data.email}
                    readOnly
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    id='password'
                    onChange={this.handleChange}
                    value={password}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Retype password'
                    type='password'
                    id='retypePassword'
                    onChange={this.handleChange}
                    value={retypePassword}
                  />

                  <Button color='teal' fluid size='large'>
                    Sign Up
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      )
    }


  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    inviteData: state.auth.inviteData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
    getInvite: (inviteID) => dispatch(getInvite(inviteID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteSignUp);