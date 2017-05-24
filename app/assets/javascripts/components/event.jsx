var Event = React.createClass({
  getInitialState: function() {
    return { edit: false,
             isOpened: false,
             complited: false};
  },

  propTypes: {
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    description: React.PropTypes.string,
    priority: React.PropTypes.number
  },

  handleDetails: function(){
    this.setState({isOpened: !this.state.isOpened});
  },

  handleComplete: function(){
    $.ajax({
      method: 'PATCH',
      url: '/api/events/' + this.props.event.id + '/complete',
       success: function(){
        this.setState({ complited: !this.state.complited });
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot complete: ', error);
      }
    });
  },

  handleDelete: function(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: '/api/events/' + this.props.event.id,
      success: function(data) {
        this.props.handleDeleteRecord(this.props.event);
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot delete requested record: ', error);
      }
    });
  },

  handleToggle: function(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  },

  recordValue: function(field) {
    return ReactDOM.findDOMNode(this.refs[field]).value;
  },

  handleUpdate: function(e) {
  e.preventDefault();
  if (this.validRecord()) {
    var event_data = {
      name: this.recordValue("name"),
      date: this.recordValue("date"),
      description: this.recordValue("description"),
      priority: this.recordValue("priority")
    };
    $.ajax({
      method: 'PUT',
      url: '/api/events/' + this.props.event.id,
      data: { event: event_data },
      success: function(data) {
        this.props.handleUpdateRecord(this.props.event, data);
        this.setState({ edit: false });
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot update requested record: ', error);
      }
    });
  } else {
    alert('Please fill all fields.');
  }
},

validRecord: function() {
    if (this.recordValue("name") &&
        this.recordValue("date") &&
        this.recordValue("description") &&
        this.recordValue("priority")) {
      return true;
    } else {
      return false;
    }
},

  renderForm: function() {
    return(
      <li>
      <form className="form-inline">
        
          <input name="name"
                 defaultValue={this.props.event.name}
                 className="form-control"
                 type="text"
                 ref="name"
          />
          
          <input name="event_date"
                 defaultValue={this.props.event.event_date}
                 className="form-control"
                 type="date"
                 ref="date"

          />
         
          <input name="description"
                 defaultValue={this.props.event.description}
                 className="form-control"
                 type="text"
                 ref="description"
          />
       
          <input name="priority"
                defaultValue={this.props.event.priority}
                className="form-control"
                type="number"
                min="1" 
                max="3"
                ref="priority"
          />
       
        
          <a className="btn btn-bordered-success btn-sm"
             onClick={this.handleUpdate}>
            Save
          </a>
          <a className="btn btn-bordered-warning btn-sm"
             onClick={this.handleToggle} >
            Cancel
          </a>
      </form>
      </li>
    );
},

  renderRecord: function() {
    var event = this.props.event;
    var details;
    if(this.state.isOpened){
      details = <div className="col-md-12 details">{event.description}</div>;
        }
    var css = (this.state.complited ? 'col-xs-3 item finished' : 'col-xs-3 item');

    return(
      <li style={this.state.style} >
      <div onClick={this.handleDetails}>
        <div className={css}>{event.name}</div>
        <div className="col-xs-2 item">{event.event_date}</div>
        <div className="col-xs-4 item">{event.description}</div>
        <div className="col-xs-1 item">{event.priority}</div> 
      </div>
        <div className="col-xs-2">
          <i className="fa fa-check" aria-hidden="true" onClick={this.handleComplete}></i> 
          <i className="fa fa-pencil" aria-hidden="true" onClick={this.handleToggle}></i>
          <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDelete}></i>  
        </div>
          {details} 
      </li>
    )
  },

  render: function() {
    if (this.state.edit) {
      return(this.renderForm());
    } else {
      return(this.renderRecord());
    }
  }
});

module.exports = Event;