var React = require('react');
var {FloatingActionButton} = require('material-ui');
var moment = require('moment');
module.exports = React.createClass({
  render: function(){
    return (
      <a href={'#'+get(this.props.gist,'id')} className="gist-item">
        <FloatingActionButton icon={this.props.edit?'image-remove-red-eye':'editor-mode-edit'}
                              onTouchTap={this.props.onEdit}
                              className={this.props.className + " action-button edit"}
                              mini={true}/>
        <div className="gist-digest" onClick={this.props.onClick}>
            <time className="mui-font-style-caption">
              {moment(get(this.props.gist,'updated_at')).fromNow()}
            </time>
            <h3>{get(this.props.gist,'description')}</h3>
        </div>
      </a>)
  }
})
