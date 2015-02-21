var React = require('react/addons');
var cx = React.addons.classSet;
var {IconButton} = require('material-ui');
var moment = require('moment');
module.exports = React.createClass({
  render: function(){
    var iconClasses = cx({
      'fa fa-eye': this.props.edit,
      'fa fa-pencil': !this.props.edit
    })
    var classes = cx({
      'hidden': !this.props.display
    })
    return (
      <a href={'#'+get(this.props.gist,'id')} className="gist-item">
        <div className="right">
          <IconButton iconClassName={iconClasses}
                      className={classes}
                      onTouchTap={this.props.onEdit}/>
        </div>

        <div className="gist-digest" onClick={this.props.onClick}>
            <time className="mui-font-style-caption">
              {moment(get(this.props.gist,'updated_at')).fromNow()}
            </time>
            <h3>{get(this.props.gist,'description')}</h3>
        </div>
      </a>)
  }
})
