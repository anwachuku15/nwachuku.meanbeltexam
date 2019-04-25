import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: []
        }
    }

    componentDidMount = () => {
        axios.get('/pets')
            .then(res => {
                this.setState({pets: res.data.pets})
            }).catch(err => {
                console.log(err);
            })
    }

    render () {
        return (
            // <h1>Homepage</h1>
            <div>
                <p><Link to='/pets/new'>Add a pet to the shelter</Link></p>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.pets.map( pet => 
                                <tr key={pet._id}>
                                    <td>{pet.name}</td>
                                    <td>{pet.type}</td>
                                    <td>
                                        <Link to={'/pets/' + pet._id + '/details'}>
                                            <button>Details</button>
                                        </Link>
                                        <Link to={'/pets/' + pet._id + '/edit'}>
                                            <button>Edit</button>
                                        </Link>     
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>    
                </table>  
            </div>
                  
        )
    }
}

export default Homepage;