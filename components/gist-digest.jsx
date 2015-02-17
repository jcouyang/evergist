var React = require('react');
var moment = require('moment');
module.exports = React.createClass({
  render: function(){
    return (
      <a href={'#'+this.props.gist.get('id')} className="gist-item">
        <div className="gist-digest" onClick={this.props.onClick}>
            <time className="mui-font-style-caption">
              {moment(this.props.gist.get('updated_at')).fromNow()}
            </time>
            <h3>{this.props.gist.get('description')}</h3>
        </div>
      </a>)
  }
})
