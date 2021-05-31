import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function App() {

    const [newTask, setNewTask] = useState({name:''});

    const [tasks, setTasks] = useState([]);

    const handleChange = e => {
        // console.log(e.target.value);
        setNewTask({name: e.target.value});
    }

    const handleSubmit = e =>{
        e.preventDefault();
        
        axios.post('/tasks', {
            name:newTask.name
        })
        .then(response => {
            // console.log('from handle submit', response)
            setTasks([response.data, ...tasks]),
            setNewTask({name:''})
        });
    }  
    
    const renderTasks = () => {
        return tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <div>
                        {task.name}{' '}
                        <span className="text-muted">
                            <br />
                            by {task.user.name} | {task.updated_at.split(' ').slice(1).join(' ')}
                        </span>
                        <Link to={`/${task.id}/edit`} className="btn btn-sm btn-warning float-right" style={{'marginLeft':'2px'}}>
                            Update
                        </Link>
                        <button 
                            onClick={() => handleDelete(task.id)} 
                            className="btn btn-sm btn-danger float-right"
                            style={{'marginLeft':'5px'}}
                        >
                            Delete
                        </button>
                    </div>  
                    <hr/>
                </div>
            </div>
        ));
    }

    const getTasks = () => {
        axios.get('/tasks').then(response => {
            setTasks([...response.data.tasks])
        });
    }

    //lifecycle method
    useEffect(() =>{
        getTasks();
      },[])

    const handleDelete = (id) => {
        //remove from local state
        const isNotId = task => task.id !== id;
        const updatedTasks = tasks.filter(isNotId);
        setTasks(updatedTasks);
        //make delete request to the backend
        axios.delete(`/tasks/${id}`);        
      }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header"> Generate PDF</div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <textarea 
                                        onChange={handleChange}
                                        value={newTask.name}
                                        name="nombre"
                                        className="form-control" 
                                        rows="5"
                                        maxLength="255"
                                        placeholder="Create new task"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Create Task
                                </button>
                            </form>

                            <hr />
                            
                            {renderTasks()}  

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

