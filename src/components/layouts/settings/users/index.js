import React, { Component } from 'react';
import { Segment, Table, Header, Button, Popup, Icon, Dimmer, Loader } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import User from './User';

import { editUser, deleteUser } from '../../../../store/actions/settingsActions';

class Users extends Component {

    handleUpdate = (uid, userData)=>{
        this.props.editUser(uid,userData)
    }

    handleDelete = (uid) => {
        this.props.deleteUser(uid)
    }

    render() {
        const { users } = this.props;

        if (!users) {
            return (
                <Segment>
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                </Segment>
            )
        }
        
        return (
            <Segment>
                <Header as='h5'>Users</Header>
                <Table compact celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Designation</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            users && users.map(user => {
                                return (
                                    <Table.Row key={user.uid}>
                                        <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                                        <Table.Cell>{user.designation}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                            <Button.Group>
                                                <User modalTrigger='editUser' modalTitle='Edit User' userData={user} action={this.handleUpdate} />
                                                <Popup trigger={<Button compact icon onClick={() => this.handleDelete(user.uid)}><Icon name='user delete' /></Button>}>Delete User</Popup>
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }

                    </Table.Body>
                </Table>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (uid, userData) => dispatch(editUser(uid,userData)),
        deleteUser: (uid) => dispatch(deleteUser(uid))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(Users);