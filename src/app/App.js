import React, { Component } from "react";
import './style.css';
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/Md"

class App extends Component {

  constructor(){
    super();
    this.state = {
      title: '',
      description: '',
      _id: '',
      tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  };

  handleChange(e){
    const { name, value} = e.target;
    this.setState({
      [name]: value
    })
  }


  addTask(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Task Updated'});
          this.setState({_id: '', title: '', description: ''});
          this.fetchTasks();
        });
    } else {
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Task Saved'});
          this.setState({title: '', description: ''});
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }

  }


  deleteTask(id){
    fetch('/api/tasks/' + id , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data=> {
        console.log(data);
        M.toast({html: 'Task Deleted'});
        this.fetchTasks();
    });
    
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        });
      });
  }

  componentDidMount(){
    this.fetchTasks()
  }

  fetchTasks(){ 
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data});
        console.log(this.state.tasks);
      });
  }


    render() {
      return (<>
        <div className="app__container">
          <nav className="task__nav">
            <h1>Don't Forget More!</h1>
          </nav>
      </div>

        <div className="main__container">

          <div className="task__card">
            <form onSubmit={this.addTask}>
              <input 
                name="title" 
                placeholder="Task"
                onChange={this.handleChange}
                value={this.state.title}
                />
              <textarea 
                name="description"   
                placeholder="Description"
                onChange={this.handleChange} 
                value={this.state.description}/>
              <button 
                disabled={!this.state.title}
                onClick={this.add}
                className="button">
                Save task</button>
            </form>
          </div>

          <div className="tasks__container"> 
            <table>
              <thead className="task__top">
                  <h2>Tasks</h2>
              </thead>
              <tbody className="task__body">
                  {
                    this.state.tasks.map(task => {
                      return (
                        <tr className="task__text" key={task._id}>
                          <td className="task__title">{task.title}</td>
                          <td className="task__description">{task.description}</td>
                          <div className="task__buttons">
                            
                              <button
                              onClick={() => this.editTask(task._id)}>
                                <AiFillEdit size={20}/>
                              </button>
                              <button
                              onClick={() => this.deleteTask(task._id)}>
                                <MdDeleteForever size={20}/>
                              </button>
                            
                          </div>
                        </tr>
                        )}
                      )
                  }
              </tbody>
            </table>
          </div>
        </div>
      </>
      )
    }
}

export default App;