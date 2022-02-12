import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: 0,
            text: '',
            // is_active: '',
            user: 0,
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.project, this.state.text, this.state.user)
        console.log(this.state.project + " " + this.state.text + " " + this.state.user)

        event.preventDefault()
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div>
                    <label htmlFor="project">project</label>

                    <select name="project" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="user">user</label>

                    <select name="user" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="text">text</label>

                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                {/*<div className="form-group">*/}
                {/*    <label htmlFor="is_active">is active</label>*/}

                {/*    <input type="radio" className="form-control" name="is_active" value="true"*/}
                {/*           onChange={(event) => this.handleChange(event)}/>*/}
                {/*    <input type="radio" className="form-control" name="is_active" value="false"*/}
                {/*           onChange={(event) => this.handleChange(event)}/>*/}
                {/*</div>*/}

                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ToDoForm
