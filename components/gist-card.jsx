var React = require('react'),
gist = require('../stores/gist'),
mui = require('material-ui'),
Paper = mui.Paper,
FlatButton = mui.FlatButton,
FloatingActionButton = mui.FloatingActionButton
var GistCard = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getInitialState: function() {
		return {
			zdepth: 0,
      displayActions: false
		}
	},
  render: function(){
    return (
      <Paper className="gist-card" zDepth={this.state.zdepth} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
        <div className="gist-digest">
          <FloatingActionButton icon="action-delete" className={this._actionButtonClass() + "action-button delete"} mini={true}/>
          <FloatingActionButton icon="action-grade" className={this._actionButtonClass() + "action-button star"} mini={true}/>

          <time className="mui-font-style-caption">{this.props.gist.get('updated_at')}</time>
          <h3>{this.props.gist.get('description')}</h3>
        </div>

      </Paper>
    )
  },

  _onMouseOver: function(){
    this.setState({
      zdepth: 4,
      displayActions: true
    })
  },
  _onMouseOut: function(){
    this.setState({
      zdepth: 0,
      displayActions: false
    })
  },
  _actionButtonClass: function(){
    return (this.state.displayActions?'':'hidden ')
  }
})

module.exports=GistCard
