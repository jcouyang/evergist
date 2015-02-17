var React = require('react'),
GistDetail = require('./gist-detail'),
GistEditor = require('./gist-editor'),
GistDigest = require('./gist-digest'),
gistStore = require('../stores/gist'),
moment = require('moment'),
{Paper,FloatingActionButton} = require('material-ui');

var FLOAT_DEPTH = 1;
var FLAT_DEPTH = 0;
var GistCard = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getInitialState: function() {
		return {
			zdepth: FLAT_DEPTH,
      stared: false,
      deleted: false,
      edit:false,
      gistDetail: ''
		}
	},
  render: function(){
    return (
      <Paper id={"gist-"+this.props.gist.get('id')}
             className={(this.props.selected?"selected":'')+" gist-card"+ (this.state.deleted?' hidden':"")}
             zDepth={this.props.selected?2:this.state.zdepth}
             onMouseOver={this._onMouseOver}
             onMouseOut={this._onMouseOut}>
        <GistDigest gist={this.props.gist} onClick={this._onTitleClick}/>
        <div className="gist-detail">
          <GistDetail display={this.props.selected&&!this.state.edit}
                      gistHtml={this.state.gistDetail}/>
          <GistEditor gistId={this.props.gist.get('id')}
                      files={this.props.gist.get('files')}
                      display={this.props.selected&&this.state.edit}/>
        </div>
      </Paper>
    )
  },
  _onTitleClick:function(e){
    e.stopPropagation()
    if(!this.props.selected){
      this.setState({
        zdepth: FLOAT_DEPTH
      })
    }
    gistStore.view(this.props.gist.get('id'))
             .then(data=>this.setState({gistDetail: get(data,'div')}))
    this.props.checkItem()
  },
  _onMouseOver: function(){
    this.setState({
      zdepth: FLOAT_DEPTH
    })
  },
  _onEditGist: function(id, e){
    e.stopPropagation();
    this.setState({zdepth:FLOAT_DEPTH,edit:!this.state.edit})
    if(!this.props.selected){
      this.setState({edit:true})
      this.props.checkItem()
    }

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
