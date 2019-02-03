import React, { Component } from 'react';
import { Segment, Form, Header } from 'semantic-ui-react';
import { createRecord } from '../../../store/actions/sectionActions';
import { connect } from 'react-redux';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class CreateRecord extends Component {
  state = {
    firstName: '',
    lastName: '',
    gender: '',
    size: '',
    about: '',
    agree: false
  }

  //Modified handler for Semantic UI Input fields, Dropdowns & Radio Buttons.
  //Same method can be used with many elements
  //name and value property are used to update the state
  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    })
  }

  //Modified handler for Semantic UI Check Box
  handleAgreeCheckBox = () => {
    this.setState({
      agree: !this.state.agree
    })
  }

  //Form handler for Semantic UI form.
  //Prevents default action and calls the actions creator mapped to props
  handleSubmit = (e) => {
    e.preventDefault();
    //Validate and show errors if required. Activate submit button

    //Call action creator
    this.props.createRecord(this.state);

    //Clear form
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      firstName: '',
      lastName: '',
      gender: '',
      size: '',
      about: '',
      agree: false
    })
  }

  render() {
    const { firstName, lastName, gender, size, about, agree } = this.state

    return (
      <Segment>
        <Header as='h5'>Create Record</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              fluid label='First name'
              placeholder='First name'
              name='firstName'
              onChange={this.handleChange}
              value={firstName}
            />
            <Form.Input
              fluid label='Last name'
              placeholder='Last name'
              name='lastName'
              onChange={this.handleChange}
              value={lastName}
            />
            <Form.Select
              fluid
              label='Gender'
              options={options}
              placeholder='Gender'
              onChange={this.handleChange}
              name='gender'
              value={gender}
            />
          </Form.Group>
          <Form.Group inline>
            <label>Size</label>
            <Form.Radio
              label='Small'
              value='sm'
              checked={size === 'sm'}
              onChange={this.handleChange}
              name='size'
            />
            <Form.Radio
              label='Medium'
              value='md'
              checked={size === 'md'}
              onChange={this.handleChange}
              name='size'
            />
            <Form.Radio
              label='Large'
              value='lg'
              checked={size === 'lg'}
              onChange={this.handleChange}
              name='size'
            />
          </Form.Group>
          <Form.TextArea
            label='About'
            placeholder='Tell us more about you...'
            name='about'
            onChange={this.handleChange}
            value={about}
          />
          <Form.Checkbox
            label='I agree to the Terms and Conditions'
            name='agree'
            onChange={this.handleAgreeCheckBox}
            checked={agree}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Segment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRecord: (record) => dispatch(createRecord(record))
  }
}

export default connect(null, mapDispatchToProps)(CreateRecord);
