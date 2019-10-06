import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Popup } from 'semantic-ui-react'
const initState = {
    modalOpen: false,
    firstName: '',
    lastName: '',
    designation: '',
    email: '',
    uid: ''
}

export class User extends Component {

    state = initState;

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { modalTrigger } = this.props;
        const { modalOpen, ...userData } = this.state;

        switch (modalTrigger) {
            case 'editUser':
                this.props.action(this.props.userData.uid, userData);
                break;
            default:
                break;
        }
        this.handleClose();
    }

    selectModalTrigger = (triggerType) => {
        switch (triggerType) {
            case 'editUser':
                return (
                    <Popup content='Edit User' trigger={<Button compact icon onClick={this.handleOpen}><Icon name='edit' /></Button>} />
                );
            default:
                return null;
        }
    }

    componentDidMount(){
        if(this.props.userData){
            this.setState({...this.state, ...this.props.userData});
        } else {
            this.setState(initState);
        }
    }

    render() {
        const { firstName, lastName, designation, email } = this.state;

        const { modalTrigger, modalTitle } = this.props;

        return (
            <Modal
                trigger={this.selectModalTrigger(modalTrigger)}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                size='small'
                closeIcon
            >
                <Header icon='user' content={modalTitle} />
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit} id='submit-form'>
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
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid label='Designation'
                                placeholder='Designation'
                                name='designation'
                                onChange={this.handleChange}
                                value={designation}
                            />
                            <Form.Input
                                fluid label='Email'
                                placeholder='Email'
                                name='email'
                                onChange={this.handleChange}
                                value={email}
                                disabled
                            />
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={this.handleClose}>
                        <Icon name='chevron left' /> Cancel
                    </Button>
                    <Button primary type='submit' form='submit-form'>
                        Proceed <Icon name='chevron right' />
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}


export default User