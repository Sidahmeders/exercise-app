import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './loading_gif/Eclipse-1s-200px.gif';
import './styles/styleBox.css';

import NavBar from './components/navbar';
const CreateExercise = lazy(() => import('./components/create_exercise'));
const EditExercise = lazy(() => import('./components/edit_exercises'));
const CreateExerciseName = lazy(() => import('./components/create_ExerciseName'));
const ExerciseList = lazy(() => import('./components/exercises_list'));


function App() {
  return (
    <Router>
      <div>
      <Route path="/" component={ NavBar } />
      <br></br>
      <Suspense fallback={     
        <div className="loading-gif">
           <img src={logo} alt="laoding" />
        </div>}>
        <Route path="/" exact component={ ExerciseList } />
        <Route path="/edit/:id" component={ EditExercise } />
        <Route path="/create" component={  CreateExercise } />
        <Route path="/user" component={ CreateExerciseName } />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
