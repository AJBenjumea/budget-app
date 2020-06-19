import React from 'react';
import axios from 'axios';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      monthly_budget: '',
    };

    this.clearForm = this.clearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
  }

  clearForm() {
    this.setState({
      user_name: '',
      monthly_budget: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post('http://localhost:3000/users', this.state)
      .then((res) => {
        this.props.updateUserBudget(res.data);
      })
      .then(() => {
        this.clearForm();
      })
      .then(() => {
        alert('Successfully submitted!');
      })
      .catch((err) => {
        console.log('err in handleSubmit in userForm: ', err);
      });
  }

  handleNameChange(event) {
    this.setState({ user_name: event.target.value });
  }

  handleBudgetChange(event) {
    this.setState({ monthly_budget: event.target.value });
  }

  render() {
    return (
      <div className="form">
        <h2>Welcome!</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Please enter your name"
              value={this.state.user_name}
              onChange={this.handleNameChange}
            />
          </label>
          <br />
          <br />
          <label>
            Monthly Budget Amount:
            <input
              type="number"
              min="0"
              placeholder="Monthly budget target ($)"
              value={this.state.monthly_budget}
              onChange={this.handleBudgetChange}
            />
          </label>
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default UserForm;
