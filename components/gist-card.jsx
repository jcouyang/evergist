var React = require('react'),
gist = require('../stores/gist'),
mui = require('material-ui'),
Paper = mui.Paper,
FlatButton = mui.FlatButton,
FloatingActionButton = mui.FloatingActionButton,
GistDetail = require('./gist-detail')
var GistCard = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getInitialState: function() {
		return {
			zdepth: 0,
      displayActions: false,
      selected: false
		}
	},
  render: function(){
    return (
      <Paper id={"gist-"+this.props.gist.get('id')} className="gist-card" zDepth={this.state.zdepth} onClick={this._onClick} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
        <div className="gist-digest">
          <FloatingActionButton icon="action-delete" className={this._actionButtonClass() + "action-button delete"} mini={true}/>
          <FloatingActionButton icon="action-grade" className={this._actionButtonClass() + "action-button star"} mini={true}/>

          <time className="mui-font-style-caption">{this.props.gist.get('updated_at')}</time>
          <h3>{this.props.gist.get('description')}</h3>
        </div>
        <div className="gist-detail"></div>
      </Paper>
    )
  },

  _onClick: function(){
    this.setState({
      selected: true,
      zdepth:2
    })
    React.render(
      <GistDetail gistId={this.props.gist.get('id')}/>,
      document.querySelector('#gist-'+this.props.gist.get('id')+ " .gist-detail")
    )
  },
  _onMouseOver: function(){
    this.setState({
      zdepth: 2,
      displayActions: true
    })
  },
  _onMouseOut: function(){
    if(!this.state.selected){
      this.setState({
        zdepth: 0,
        displayActions: false
      })
    }
  },
  _actionButtonClass: function(){
    return (this.state.displayActions?'':'hidden ')
  }
})

module.exports=GistCard
