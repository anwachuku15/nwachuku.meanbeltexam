import React, { Component } from 'react';
import axios from 'axios';


class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pet: {
                name: '',
                type: '',
                description: '',
                skill1: '',
                skill2: '',
                skill3: '',
                likes: 0
            },
            clicks: 0,
            errors: {}
        }
    }

    componentDidMount = () => {
        //pull in specific id information from the edit link
        console.log(this.props.match.params._id);
        
        axios.get(`/pets/${this.props.match.params._id}`)
            .then(res => {
                this.setState({pet: res.data.pet});
            }).catch(err => {
                console.log(err);
            })
    }

    like = (e) => {
        this.setState({clicks: this.state.clicks+1});
        
        let newLike = this.state.pet.likes + 1;
        this.setState({pet: {...this.state.pet, likes: newLike} }, 
            () => {
                axios.put(`/pets/${this.props.match.params._id}`,
                this.state.pet)
                    .then(res => {
                        this.props.history.push();
                    })
                
            }
        )
        

    }

    adopt = (e) => {
        axios.delete(`/pets/${this.props.match.params._id}`)
            .then(res => {
                this.props.history.push('/');
            })
    }

    
    

    render () {
        
        return (
            <div>
                <h3>Details about {this.state.pet.name}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Pet type:</td>
                            <td>{this.state.pet.type}</td>
                        </tr>
                        <br></br>
                        <tr>
                            <td>Description:</td>
                            <td>{this.state.pet.description}</td>
                        </tr>
                        <br></br>
                        <tr>
                            <td>Skills:</td>
                            <td>
                                <li>{this.state.pet.skill1}</li>
                                <li>{this.state.pet.skill2}</li>
                                <li>{this.state.pet.skill3}</li>
                                
                            </td>
                        </tr>
                        <br></br>
                        <tr>
                            <td>Likes:</td>
                            <td>{this.state.pet.likes}</td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <button onClick={this.like} disabled={this.state.clicks === 1}>Like this pet</button>
                <button onClick={this.adopt}>Adopt this pet!</button>
            </div>
        )
    }
}

export default Details;