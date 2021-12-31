import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: 411,
            // projects: [],
            text: '',
            // is_active: true,
            // date_create: 2021 - 12 - 20,
            // date_update: 2021 - 12 - 20,
            user: 7,
            // users: []
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
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="project">project</label>*/}
                {/*    <input type="number" className="form-control" name="project" value={this.state.project}*/}
                {/*           onChange={(event) => this.handleChange(event)}/>*/}
                {/*</div>*/}

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
                {/*    <label htmlFor="is_active">is_active</label>*/}

                {/*    <input type="radio" className="form-control" name="is_active" value={this.state.is_active}*/}
                {/*           onChange={(event) => this.handleChange(event)}/>*/}
                {/*</div>*/}

                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ToDoForm
