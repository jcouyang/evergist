var React = require('react'),
gist = require('../stores/gist'),
mui = require('material-ui'),
Paper = mui.Paper,
FlatButton = mui.FlatButton,
FloatingActionButton = mui.FloatingActionButton
var GistCard = React.createClass({
  getInitialState: function() {
		return {
			zdepth: 0,
      displayActions: false
		}
	},
  render: function(){
    var content = (
      <div className="gist-digest">
        <FloatingActionButton icon="action-delete" className={this._actionButtonClass() + "action-button delete"} mini={true}/>
        <FloatingActionButton icon="action-grade" className={this._actionButtonClass() + "action-button star"} mini={true}/>

        <time className="mui-font-style-caption">3 weeks ago</time>
        <h3>Title</h3>
        <p className="description mui-font-style-caption">descriptions goes here lalalas goes here lalalas goes here lalalas goes here lalalas goes here lalalas goes here lalalas goes here lalala...</p>
      </div>
    )

    return (
      <Paper children={content} className="gist-card" zDepth={this.state.zdepth} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}/>
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
