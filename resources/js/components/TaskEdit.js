import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pdf from "react-to-pdf";

const ref = React.createRef();
const options = {    
    
};

class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            task: []
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handle change
    handleChange(e) {
        this.setState({
            name: e.target.value
        });
        // console.log(e.target.value);
    }
    // handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/tasks/${this.props.match.params.id}`, {
                name: this.state.name
            })
            .then(response => {
                // console.log('from handle sumit', response);
                this.props.history.push('/');
            });
    }

    // get all the tasks from backend
    getTasks() {
        axios.get(`/tasks/${this.props.match.params.id}/edit`).then(response =>
            this.setState({
                task: response.data.task,
                name: response.data.task.name
            })
        );
    }
    // lifecycle mehtod
    componentWillMount() {
        this.getTasks();
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">                    
                    <div className="col-md-8" ref={ref}>
                        <div className="card">
                            <img src="/img/header-1.jpg" alt="Grupo CloudSpace" />
                            <img src="/img/logoGC.png" alt="Grupo CloudSpace" style={{'padding':'50px'}} />
                            {/* <div className="card-header">CloudSpace</div> */}

                            <div className="card-body">

                                <p style={{'color':'#8f8f8f','fontSize':'17px'}}>
                                    Propuesta Comercial
                                </p>
                                <p style={{'color':'#00b3e3','fontSize':'26px'}}>
                                    Ofrecemos IT moderna como un servicio a través de aplicaciones, datos, seguridad e infraestructura.
                                </p>

                                <p style={{'fontSize':'15px','textAlign':'center','fontWeight':'bold'}}>
                                    Propuesta enviada el 31/05/2021
                                </p>
                                <p style={{'fontSize':'15px','textAlign':'center'}}>
                                    {this.state.name}
                                </p>

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            className="form-control"
                                            rows="5"
                                            maxLength="255"
                                            placeholder="Create a new task"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Edit Task
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="container">
                            <div className="row justify-content-center"> 
                                <Pdf targetRef={ref} filename="prespuesto-GC.pdf" options={options} y={1.9} x={3}>
                                    {({ toPdf }) => <button onClick={toPdf} className="btn btn-danger" style={{'marginTop':'30px'}}>Generate PDF</button>}
                                </Pdf>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskEdit;