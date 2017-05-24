var SortColumn = require('./sort_column.jsx');
var Event = require('./event.jsx');
var EventList = React.createClass({
  handleDeleteRecord: function(event) {
    this.props.handleDeleteRecord(event);
  },

  handleUpdateRecord: function(old_event, event) {
    this.props.handleUpdateRecord(old_event, event);
  },

  handleSortColumn: function(name, order) {
    this.props.handleSortColumn(name, order);
  },

  render: function() {
    var events = [];
    this.props.events.forEach(function(event) {
      events.push(<Event event={event}
                         key={'event' + event.id}
                         handleDeleteRecord={this.handleDeleteRecord} 
                         handleUpdateRecord={this.handleUpdateRecord} />);
    }.bind(this));

    return(
        <div>
          <div className="list-header">
            <div className="col-xs-3 sortable">
              <SortColumn name="name"
                          text="Name"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn}/>
            </div>
            <div className="col-xs-2 sortable">
              <SortColumn name="event_date"
                          text="Date"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn}/>
            </div>
            <div className="col-xs-4 sortable">
               <SortColumn name="description"
                          text="Description"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn}/>
            </div>
            <div className="col-xs-1 sortable">
               <SortColumn name="priority"
                          text="Priority"
                          sort={this.props.sort}
                          order={this.props.order}
                          handleSortColumn={this.handleSortColumn}/>
            </div>
            <div className="col-xs-2">Actions</div>
          
          </div>
          <ul>
          {events}
          </ul>
        </div>
    )
  }
});

module.exports = EventList;