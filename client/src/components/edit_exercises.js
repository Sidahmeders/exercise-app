import React, { Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom';


class EditExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: "",
      description: "",
      level: "",
      duration: 0,
      date: new Date()
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:4500/exercises/${this.props.match.params.id}`)
    .then(response => this.setState({
      exercise: response.data.exercise,
      description: response.data.description,
      level: response.data.level,
      duration: response.data.duration,
      date: response.data.date.split("T")[0]
    }))
  }

  onChangeUsername = (e) => {
    this.setState({
      exercise: e.target.value
    })
  }

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  onChangeLevel = (e) => {
    this.setState({
      level: e.target.value
    })
  }

  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value
    })
  }
  
  onChangeDate = (date) => {
    this.setState({
      date: new Date(date)
    })
  }
 
  onFormSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      exercise: this.state.exercise,
      Description: this.state.description,
      level: this.state.level,
      Duration: this.state.duration,
      Date: this.state.date
    }
    axios.post(`http://localhost:4500/exercises/update/${this.props.match.params.id}`, exercise)
    .then(() => console.log('Exercise Updated'))

    window.location = "/"
  }


  render() {
    return (
      <div className="container">
        <h3>Edit The User Detail</h3>
        <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
            <label>Edit The Username</label>
            <input type="text" className="form-control"
             value={this.state.exercise} onChange={this.onChangeUsername} />
            <label>Edit The description</label>
            <input type="text" className="form-control" 
            value={this.state.description} onChange={this.onChangeDescription} />
            <label>Edit the Level</label>
            <input type="text"  className="form-control" 
            onChange={this.onChangeLevel} value={this.state.level} />
            <label>Edit The duration</label>
            <input type="number" className="form-control"min="1" 
             value={this.state.duration} onChange={this.onChangeDuration} />
          <div className="form-group">
          </div>
            <DatePicker value={this.state.date} onChange={this.onChangeDate} />
          </div>
          <div>
            <button type="submit" className="btn btn-primary text-light">Edit Exercise</button>
            <Link to="/" className="btn btn-success text-light ml-4">Cancel</Link>
            </div>
        </form>
      </div>
    );
  }
}


export default EditExercise;
