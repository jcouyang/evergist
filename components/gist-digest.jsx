var React = require('react');
var moment = require('moment');
module.exports = React.createClass({
  render: function(){
    return (
      <a href={'#'+get(this.props.gist,'id')} className="gist-item">
        <div className="gist-digest" onClick={this.props.onClick}>
            <time className="mui-font-style-caption">
              {moment(get(this.props.gist,'updated_at')).fromNow()}
            </time>
            <h3>{get(this.props.gist,'description')}</h3>
        </div>
      </a>)
  }
})
