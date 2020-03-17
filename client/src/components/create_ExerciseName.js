import React, { Component} from 'react';
import axios from 'axios';
import '../styles/exerciseName.css';
import loading from '../loading_gif/Eclipse-1s-200px.gif';


const ExerciseName = props => (
    <div className="exercise-name">
        <p>{props.exerciselist.exercise}</p>
        <button onClick={() => props.deleteExr(props.id)}>delete Exercise</button>
    </div>
);


class CreateExerciseName extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            exercise: "",
            unValid: "",
            exercisesListNames: false,
            id: ""
        }
    };

    componentDidMount() {
        this._isMounted = true;
        axios.get('/exerciseName')
        .then(response => {
            this.setState({
                exercisesListNames: response.data
            })
        })
        .catch(err => console.log(err));
    };

  onChangeExerciseName = (e) => {
      this.setState({
          exercise: e.target.value
      })
  };

  onSubmitForm = (e) => {
      
      e.preventDefault();
      const exerciseName = {
          exercise: this.state.exercise
      };
      
      if(exerciseName.exercise.length > 3) {
        axios.post('/exerciseName/add', exerciseName)
        .then(res => console.log(res))
        this.setState({
            exercise: "",
            unValid: ""
        });
        window.location = '/user';
    } else {
        this.setState({unValid: "provide at least 4 Character !"});
    }
  };

  deleteExercise = (id) => {
      this.setState({id: id})
      axios.delete('/exerciseName/'+id)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

      this.setState({exercisesListNames: this.state.exercisesListNames.filter(el => el._id !== this.state.id)});


      window.location = '/user';
  };

  exercisesListName = () => {
      return this.state.exercisesListNames.slice(0).reverse().map(item => {
          return <ExerciseName deleteExr={this.deleteExercise} exerciselist={item} id={item._id} key={item._id} />
      });
  };

  componentWillUnmount() {
      this._isMounted = false;
  };

  render() {
    return (
        <div className="container create-exer-name">
         <h3>Create Exercise</h3>
         <form onSubmit={this.onSubmitForm}>
          <div className="form-group">
           <label>Exercise Name:</label>
           <input type="text" className="form-control" value={this.state.exercise}
            onChange={this.onChangeExerciseName} maxLength="30" />
           </div>
           <p style={{color:"red"}}>{this.state.unValid}</p>
           <div className="form-group">
             <input type="submit" className="btn btn-primary" />
           </div>
           <h3>Exercises List</h3>
           <div className="lists">
               {!this.state.exercisesListNames ? (
                   <div className="loading-gif-names">
                       <img src={loading} alt="loading" />
                   </div>
               ) : 
               (
                   this.exercisesListName()
               )}
           </div>
         </form>
        </div>
    );
  }
};


export default CreateExerciseName;