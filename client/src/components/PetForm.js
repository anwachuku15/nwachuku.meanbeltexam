import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class PetForm extends Component {
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

    changeName = (e) => {
        this.setState({pet: {...this.state.pet, name: e.target.value }})
    }

    changeType = (e) => {
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

    create = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post('/pets', this.state.pet)
            .then(res => {
                console.log(res);
                if(res.data.errors){
                    this.setState({errors: res.data.errors.errors});
                } else {
                    this.props.history.push('/');
                }
            }).catch(err => {
                console.log(err);
            });
    }

    

    render () {
        return (
            <div>
                <h4>Know of a pet needing a home?</h4>
                <p>The pet must have a name</p>
                <form onSubmit={this.create}>
                <p>Pet Name:&nbsp; 
                    <input type='text' onChange={this.changeName}/>
                        {
                            (this.state.errors.name) ? 
                            <span>{this.state.errors.name.message}</span> :
                            <span></span>
                        }
                </p>
                <p>Pet Type:&nbsp;
                    <input type='text' onChange={this.changeType}/>
                    {
                            (this.state.errors.type) ? 
                            <span>{this.state.errors.type.message}</span> :
                            <span></span>
                        }
                </p>
                <p>Description:&nbsp;
                    <input type='text' onChange={this.changeDesc}/>
                    {
                            (this.state.errors.description) ? 
                            <span>{this.state.errors.description.message}</span> :
                            <span></span>
                        }
                </p>
                Skills:&nbsp; 
                <ul>
                    <li>Skill 1: <input type='text' onChange={this.changeSkill1}/></li>
                    <li>Skill 2: <input type='text' onChange={this.changeSkill2}/></li>
                    <li>Skill 3: <input type='text' onChange={this.changeSkill3}/></li>
                </ul>
                
                <button type='submit'>Add Pet</button>
                <Link to={'/'}>
                    <button>Cancel</button>
                </Link>
                </form>
            </div>
        );
    }
}

export default PetForm;