var DatePicker = require('react-datepicker');
var moment = require('moment');
var NewForm = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    description: React.PropTypes.string,
    priority: React.PropTypes.number
  },
  getInitialState: function() {
    return {
      name: '',
      event_date: moment(),
      description: '',
      priority: '',
      startDate: moment()
    }
  },
  handleAdd: function(e) {
    e.preventDefault();
    var self = this;
    console.log(self.state);
    if (this.validForm()) {
      $.ajax({
        url: '/api/events',
        method: 'POST',
        data: { event: self.state },
        success: function(data) {
          self.props.handleAdd(data);
          self.setState(self.getInitialState());
        },
        error: function(xhr, status, error) {
          alert('Cannot add a new record: ', error);
        }
      })
    } else {
      alert('Please fill all fields.');
    }
  },
  validForm: function() {
    if (this.state.name && this.state.event_date && this.state.description && this.state.priority) {
      return true;
    } else {
      return false;
    }
  },
  handleChange: function(e) {
    var input_name = e.target.name;
    var value = e.target.value;
    this.setState({ [input_name] : value });
    console.log(value);
  },

   handleDateChange: function(e) {
    this.setState({
      startDate: e,
      event_date: e._d
    });
  },

  render: function() {
    return(
      <form className="form-inline" onSubmit={this.handleAdd}>
        <div className="form-group">
          <input type="text"
                className="form-control"
                name="name"
                placeholder="enter name"
                ref="name"
                value={this.state.name}
                onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <DatePicker
              selected={this.state.startDate}
              onChange={this.handleDateChange}
              className="form-control"
          />
        </div>
        <div className="form-group">
          <input type="text"
                className="form-control"
                name="description"
                placeholder="Description"
                ref="description"
                value={this.state.description}
                onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="number"
                min="1" 
                max="3"
                className="form-control"
                name="priority"
                placeholder="priority"
                ref="priority"
                value={this.state.priority}
                onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-bordered-primary">Add</button>
      </form>
    )
  }
});

module.exports = NewForm;