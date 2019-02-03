import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import Brand from '../../resources/logo.png';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';

class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
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
    this.props.signUp(this.state);
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' />

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
                />
                <Form.Input
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='Last Name'
                  id='lastName'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid icon='paper plane'
                  iconPosition='left'
                  placeholder='E-mail address'
                  id='email'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  id='password'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Retype password'
                  type='password'
                  id='retypePassword'
                  onChange={this.handleChange}
                />

                <Button color='teal' fluid size='large'>
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              Go back to <Link to='/signin'>Sign In</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);