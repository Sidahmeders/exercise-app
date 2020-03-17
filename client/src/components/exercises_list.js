import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../styles/styleBox.css';
import '../styles/exercise-list.css'
import loading from '../loading_gif/Eclipse-1s-200px.gif';


const ExerciseItem = props => (
    <div className="card">
     <p className="exercise">{props.exercise.exercise}</p>
     <p className="level">{props.exercise.level}</p>
     <p className="description">{props.exercise.description}</p>
     <p className="duration">Duration: {props.exercise.duration}(min)</p>
     <p className="date">Date: {props.exercise.date.split('T')[0]}</p>
      <Link to={`edit/${props.exercise._id}`} className="button edit">Edit</Link>
      <button className="button del" onClick={() => props.deleteExer(props.exercise._id)}> delete</button>
    </div> 
)

const DeleteBox = props => (
    <div className={props.class}>
        <h4>warning: this exercise will be gone forever</h4>
        <h5>confirm to delete the exrecise </h5>
        <button onClick={() => props.confirmDel()}>Confirm</button>
        <hr></hr>
        <button onClick={() => props.cancelDel()}>Cancel</button>
    </div>
)


class ExerciseList extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            exercises: false,
            change: false,
            class: "hide",
            id: ""
        }
    }

    componentDidMount() {
        this._isMounted = true;
        axios.get('/exercises')
        .then(response => {
            if(this._isMounted) {
                this.setState({
                    exercises: response.data
                })
            }
        })
        .catch(err => console.log(`Error: ${err}`))       
    }

    deleteExercise = (id) => {
        this.setState({
            Change: true,
            class: this.state.change ? "hide" : "del-box",
            id: id
        })
    }

    confirmDelete = () => {
        axios.delete('http://localhost:4500/exercises/'+this.state.id)
        .then(response => console.log(response.data))

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== this.state.id),
            class: "hide"
        })
    }

    cancelDelete = () => {
        this.setState({
            class: "hide"
        })
    }

    exerciseListsItem = () => {
        return this.state.exercises.slice(0).reverse().map(item => {
             return <ExerciseItem exercise={item} deleteExer={this.deleteExercise} key={item._id} />
         })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

  render() {
    return (
       <div className="exercises-items-cards">
           {!this.state.exercises ? (
               <div className="loading-gif">
                   <img src={loading} alt="loading" />
               </div>
           ) : (
               <React.Fragment>
                   <DeleteBox class={this.state.class} confirmDel={this.confirmDelete} cancelDel={this.cancelDelete} />
                   <h2>Select your Workout</h2>
                   <div className="exer-items">
                       {this.exerciseListsItem()}
                   </div>
                   <a href="/#" className="scroll-up">Up</a>
               </React.Fragment>
           )}
       </div>
    );
  }
}


export default ExerciseList;
