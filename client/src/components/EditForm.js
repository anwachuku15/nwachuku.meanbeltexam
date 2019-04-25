import React, { Component } from 'react';
import axios from 'axios';
// import 'react-router';
import {Link} from 'react-router-dom';
// import Details from './Details';

class EditForm extends Component {
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

    changeName = (e) => {
        this.setState({pet: {...this.state.pet, name: e.target.value }})
    }

    changeType= (e) => {
        this.setState({pet: {...this.state.pet, type: e.target.value }})
    }

    changeDesc = (e) => {
        this.setState({pet: {...this.state.pet, description: e.target.value }})
    }

    changeSkill1 = (e) => {
        this.setState({pet: {...this.state.pet, skill1: e.target.value }})
    }

    changeSkill2 = (e) => {
        this.setState({pet: {...this.state.pet, skill2: e.target.value }})
    }

    changeSkill3 = (e) => {
        this.setState({pet: {...this.state.pet, skill3: e.target.value }})
    }

    edit = (e) => {
        e.preventDefault();
        console.log(this.state);
        //pass to backend
        axios.put(`/pets/${this.props.match.params._id}`, 
        this.state.pet)
            .then(res => {
                if(res.data.errors){
                    this.setState({errors: res.data.errors.errors});
                } else {
                    this.props.history.push('/pets/' + this.props.match.params._id+ '/details');
                }
                console.log(res);

            }).catch(err => {
                console.log(err);
            })
    }

    // check = (e) => {
    //     axios.get('http://localhost:8000/pets')
    //         .then(res => {
    //             let checkPets = res.data.pets;
    //             let names = [];
    //             for(let i=0; i<checkPets.length; i++){
    //                 names.push(checkPets[i].name);
    //             }
    //             console.log(names)
    //         })
    // }


    render () {
        return (
            <div>
                <h3>Edit this pet</h3>
                <form onSubmit={this.edit}>
                <p>Pet Name:&nbsp; 
                    <input type='text' onChange={this.changeName} value={this.state.pet.name}/>
                        {
                            (this.state.errors.name) ? 
                            <span>{this.state.errors.name.message}</span> :
                            <span></span>
                        }
                        
                </p>
                <p>Pet Type:&nbsp;
                    <input type='text' onChange={this.changeType} value={this.state.pet.type}/>
                        {
                            (this.state.errors.type) ? 
                            <span>{this.state.errors.type.message}</span> :
                            <span></span>
                        }
                </p>
                <p>Description:&nbsp;
                    <input type='text' onChange={this.changeDesc} value={this.state.pet.description}/>
                        {
                            (this.state.errors.description) ? 
                            <span>{this.state.errors.description.message}</span> :
                            <span></span>
                        }
                </p>
                Skills:&nbsp; 
                <ul>
                    <li>Skill 1: <input type='text' onChange={this.changeSkill1} value={this.state.pet.skill1}/></li>
                    <li>Skill 2: <input type='text' onChange={this.changeSkill2} value={this.state.pet.skill2}/></li>
                    <li>Skill 3: <input type='text' onChange={this.changeSkill3} value={this.state.pet.skill3}/></li>
                </ul>
                <button type='submit'>Edit Pet</button>
                {/* <Link to={'/pets' + this.props.match.params._id+ '/details'} component={Details}>
                    
                </Link>  */}
                <Link to={'/pets/' + this.props.match.params._id+ '/details'}>
                    <button>Cancel</button>
                </Link>
                </form>

                {/* <button onClick={this.check}>Check</button> */}
            </div>
                
             
        );
    }
}

export default EditForm;