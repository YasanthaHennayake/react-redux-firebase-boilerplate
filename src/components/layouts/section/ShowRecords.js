import React, { Component } from 'react'
import { Segment, Header, Button, Checkbox, Icon, Table, Menu, Popup } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { allRoutes } from '../../../config/navConfig';

export class ShowRecords extends Component {
    navigateToCreateRecord = ()=> {
        this.props.history.push(allRoutes.section.create);
    }
    render() {
        const { records } = this.props;
        return (
            <Segment>
                <Header as='h5'>Records List</Header>
                <Table compact celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Gender</Table.HeaderCell>
                            <Table.HeaderCell>Size</Table.HeaderCell>
                            <Table.HeaderCell>About</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            records && records.map((record) => {
                                var size = '';
                                switch (record.size) {
                                    case 'sm':
                                        size = 'Small';
                                        break;
                                    case 'md':
                                        size = 'Medium';
                                        break;
                                    case 'lg':
                                        size = 'Large';
                                        break;
                                    default:
                                        break;
                                }
                                return (
                                    <Table.Row key={record.id}>
                                        <Table.Cell collapsing>
                                            <Checkbox slider />
                                        </Table.Cell>
                                        <Table.Cell>{record.firstName} {record.lastName}</Table.Cell>
                                        <Table.Cell>{record.gender}</Table.Cell>
                                        <Table.Cell>{size}</Table.Cell>
                                        <Table.Cell>{record.about}</Table.Cell>
                                        <Table.Cell>
                                            <Button.Group>
                                                <Popup trigger={<Button compact icon><Icon name='check' /></Button>}>Approve</Popup>
                                                <Popup trigger={<Button compact icon><Icon name='file' /></Button>}>View</Popup>
                                                <Popup trigger={<Button compact icon><Icon name='edit' /></Button>}>Edit</Popup>
                                                <Popup trigger={<Button compact icon><Icon name='trash' /></Button>}>Delete</Popup>
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='5'>
                                <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.navigateToCreateRecord}>
                                    <Icon name='user' /> Add Record
                                </Button>
                                <Button size='small'>Approve Selected</Button>
                                <Button size='small'>
                                    Delete Selected
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell colSpan='6'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        records: state.firestore.ordered.records
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'records' }
    ])
)(ShowRecords);

/*
Pending development

1. Dynamic pagination options
2. Search option
3. Action buttons

*/
