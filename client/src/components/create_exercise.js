import React, { Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import '../styles/create-exer.css'


class CreateExercise extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            exercise: "",
            description: "",
            level: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    };

    componentDidMount() {
        this._isMounted = true;
        axios.get('http://localhost:4500/exerciseName')
        .then(response => {
            if(response.data.length > 0) {
                if(this._isMounted) {
                    this.setState({
                        users: response.data.map(user => user.exercise),
                        exercise: response.data[0].exercise
                    })
                }
            }
        })
    };

    onChangeUsername = (e) => {
        this.setState({
            exercise: e.target.value
        })
    };

    onChangedescription = (e) => {
        this.setState({
            description: e.target.value
        })
    };

    onChangeLevel = (e) => {
        this.setState({
            level: e.target.value
        })
    };

    onChangeDuration = (e) => {
        this.setState({
            duration: e.target.value
        })
    };

    onChangeDate = (date) => {
        this.setState({
            date: date
        })
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        const exercise = {
            exercise: this.state.exercise,
            Description: this.state.description,
            level: this.state.level,
            Duration: Number(this.state.duration),
            Date: this.state.date
        };

        axios.post('http://localhost:4500/exercises/add', exercise)
        .then(res => console.log(res))
        .catch(err => console.log(err));

        window.location = "/";
    };

    componentWillUnmount() {
        this._isMounted = false;
    };
    
  render() {
    return (
       <div className="container create-exercise">
         <h3>Create and Costum your Exercise</h3>
         <form onSubmit={this.onSubmitForm}>
 
          <div className="form-group">
            <label>Exercise Name:</label>
            <select ref="userInput" className="form-control" required
               value={this.state.exercise} onChange={this.onChangeUsername}
            >
            {this.state.users.map((user, id) => {
                return <option key={id} value={user}>{user}</option>
            })}
            </select>
            <label>Level:</label>
            <select className="form-control" onChange={this.onChangeLevel} required>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Veteran</option>
            </select>
            <label>Description:</label>
            <input type="text" className="form-control" required maxLength="125"
              onChange={this.onChangedescription} value={this.state.description} 
            ></input>
            <label>Duration (in minutes)</label>
            <input type="number" className="form-control" min="1" required
               value={this.state.duration} onChange={this.onChangeDuration}
            ></input>
          </div>
          <label>Date</label>
          <div className="form-group">
              <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
          </div>
          <div className="form-group">
            <input type="submit" value="Submit the Exercise" className="btn btn-primary"/> 
          </div>

         </form>
       </div>
    );
  }
};


export default CreateExercise;
