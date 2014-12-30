var React = require('react'),
GistDetail = require('./gist-detail'),
{Paper,FloatingActionButton} = require('material-ui');
var GistCard = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getInitialState: function() {
		return {
			zdepth: 0
		}
	},
  render: function(){
    return (
      <Paper id={"gist-"+this.props.gist.get('id')} className={(this.props.selected?"selected":'')+" gist-card"} zDepth={this.props.selected?2:this.state.zdepth} onClick={this._onClick} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
        <div className="gist-digest">
          <FloatingActionButton onClick={this._onDeleteGist.bind(this,this.props.gist.get('id'))} icon="action-delete" className={this._actionButtonClass() + "action-button delete"} mini={true}/>
          <FloatingActionButton icon="action-grade" className={this._actionButtonClass() + "action-button star"} mini={true}/>
          <time className="mui-font-style-caption">{this.props.gist.get('updated_at')}</time>
          <h3>{this.props.gist.get('description')}</h3>
        </div>
        <div className={'gist-detail ' + (this.props.selected?"":"hidden")}></div>
      </Paper>
    )
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({zdepth:nextProps.selected?2:0})
  },
  _onClick: function(){
    this.setState({
      zdepth:2
    })
    document.querySelector('body').scrollTop = this.props.scrollTop
    React.render(
      <GistDetail gistId={this.props.gist.get('id')}/>,
      document.querySelector('#gist-'+this.props.gist.get('id')+ " .gist-detail")
    )
  },
  _onMouseOver: function(){
    this.setState({
      zdepth: 2
    })
  },
  _onDeleteGist: function(id,e){
    e.stopPropagation()
    console.log(e, 'delete gist'+id)
  },
  _onMouseOut: function(){
    if(!this.props.selected){
      this.setState({
        zdepth: 0
      })
    }
  },
  _actionButtonClass: function(){
    return (this.state.zdepth?'':'hidden ')
  }
})

module.exports=GistCard
