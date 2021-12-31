import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            rep_link: 'http://github.com/',
            users: [],
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
        this.props.createProject(this.state.name, this.state.rep_link, this.state.users)
        console.log(this.state.name + " " + this.state.rep_link + " " + this.state.users)

        event.preventDefault()
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {

            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users': users
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="rep_link">repository link</label>

                    <input type="url" className="form-control" name="rep_link" value={this.state.rep_link}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div>
                    <label htmlFor="users">users</label>

                    <select name="users" multiple onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm
