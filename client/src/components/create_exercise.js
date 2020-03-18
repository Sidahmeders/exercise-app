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
        axios.get('/exerciseName')
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
        .catch(err => console.log(err));
    };

    onStateChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onChangeDate = (date) => {
        this.setState({
            date: date
        });
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

        axios.post('/exercises/add', exercise)
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
            <select ref="userInput" className="form-control" required name="exercise"
               value={this.state.exercise} onChange={this.onStateChange}
            >
            {this.state.users.map((user, id) => {
                return <option key={id} value={user}>{user}</option>
            })}
            </select>
            <label>Level:</label>
            <select className="form-control" onChange={this.onStateChange} name="level" required>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Veteran</option>
            </select>
            <label>Description:</label>
            <input type="text" className="form-control" required maxLength="125" name="description"
              onChange={this.onStateChange} value={this.state.description} 
            ></input>
            <label>Duration (in minutes)</label>
            <input type="number" className="form-control" min="1" name="duration" required
               value={this.state.duration} onChange={this.onStateChange}
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
