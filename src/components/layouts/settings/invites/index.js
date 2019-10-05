import React, { Component } from 'react';
import { Segment, Table, Header, Button, Popup, Icon } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Invite from './Invite';
import { createNewInvite, updateInvite, deleteInvite } from '../../../../store/actions/settingsActions';



class Invites extends Component{


    handleCreate = (inviteData) => {
        this.props.createNewInvite(inviteData);
    }

    handleUpdate = (inviteID, inviteData) => {
        this.props.updateInvite(inviteID,inviteData);

    }
    handleDelete = (inviteID) => {
        this.props.deleteInvite(inviteID);
    }

    render(){
        
        const { invites } = this.props;

        return(
            <Segment>
                <Header as='h5'>Invitations</Header>
                <Table compact celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='5'>
                                <Invite modalTrigger='newInvite' modalTitle='New Invitation' action={this.handleCreate} />
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Designation</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {
                            invites && invites.map(invite => {
                                return (
                                    <Table.Row key={invite.id}>
                                        <Table.Cell>{invite.firstName} {invite.lastName}</Table.Cell>
                                        <Table.Cell>{invite.designation}</Table.Cell>
                                        <Table.Cell>{invite.email}</Table.Cell>
                                        <Table.Cell>
                                            <Button.Group>
                                                <Invite modalTrigger='editInvite' modalTitle='Edit Invitation' inviteData={invite} action={this.handleUpdate} />
                                                <Popup trigger={<Button compact icon onClick={() => this.handleDelete(invite.id)}><Icon name='user delete' /></Button>}>Delete invite</Popup>
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
        invites: state.firestore.ordered.invites
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        createNewInvite: (inviteData) => dispatch(createNewInvite(inviteData)),
        updateInvite: (inviteID, inviteData) => dispatch(updateInvite(inviteID,inviteData)),
        deleteInvite: (inviteID)=> dispatch(deleteInvite(inviteID)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'invites'}
    ])
)(Invites);