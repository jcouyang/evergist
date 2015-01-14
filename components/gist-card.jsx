var React = require('react'),
GistDetail = require('./gist-detail'),
GistEditor = require('./gist-editor'),
gistStore = require('../stores/gist'),
moment = require('moment'),
{Paper,FloatingActionButton} = require('material-ui');
var GistCard = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getInitialState: function() {
		return {
			zdepth: 0,
      stared: false,
      deleted: false,
      edit:false
		}
	},
  render: function(){
    return (
      <Paper id={"gist-"+this.props.gist.get('id')}
             className={(this.props.selected?"selected":'')+" gist-card"+ (this.state.deleted?' hidden':"")}
             zDepth={this.props.selected?2:this.state.zdepth}
            
             onMouseOver={this._onMouseOver}
             onMouseOut={this._onMouseOut}>
        <a href={'#'+this.props.gist.get('id')} className="gist-item">
        <div className="gist-digest" onClick={this._onTitleClick}>
          <FloatingActionButton onClick={
                                this._onDeleteGist
                                .bind(this,this.props.gist.get('id'),
                                      this.props.gist.get('description'))
                                }
                                icon="action-delete"
                                className={this._actionButtonClass() + "action-button delete"}
                                mini={true}/>
          <FloatingActionButton icon={this.state.stared?'action-rate':'action-grade'}
                                onClick={this._onStarGist.bind(this,this.props.gist.get('id'))}
                                className={this._actionButtonClass() + "action-button star"}
                                mini={true}/>
          <FloatingActionButton icon="editor-mode-edit"
                                onClick={this._onEditGist.bind(this,this.props.gist.get('id'))}
                                className={this._actionButtonClass() + "action-button edit"}
                                mini={true}/>
          <time className="mui-font-style-caption">
            {moment(this.props.gist.get('updated_at')).fromNow()}
          </time>
          <h3>{this.props.gist.get('description')}</h3>
        </div>
        </a>
        <div className="gist-detail">
          <GistDetail gistId={this.props.gist.get('id')}
                      files={this.props.gist.get('files')}
                      display={this.props.selected&&!this.state.edit}/>
          <GistEditor gistId={this.props.gist.get('id')}
                      files={this.props.gist.get('files')}
                      onSave={this._toggleEdit}
                      display={this.props.selected&&this.state.edit}/>
        </div>
      </Paper>
    )
  },
  _onTitleClick:function(e){
    e.stopPropagation()
    if(!this.props.selected){
      this.setState({
        zdepth:2
      })
    }
    this.props.checkItem()
  },
  _onMouseOver: function(){
    this.setState({
      zdepth: 2
    })
  },
  _onDeleteGist: function(id,description,e){
    e.stopPropagation();
    $E.on('dialog.confirm',(data)=>{
      $E.off('dialog.confirm')
      if(data===id){
        gistStore.delete(id).then(()=>this.setState({deleted:true}));
        this.props.deleteGist(this.props.index);
      }
      
    })
      .trigger('dialog.showConfirm', {title:'Sure You Wanna DELETE "'+ description + '"?', id:id});
  },
  _onEditGist: function(id, e){
    e.stopPropagation();
    if(!this.props.selected)
      this.props.checkItem()
    this.setState({zdepth:2,edit:!this.state.edit})

  },
  _onStarGist: function(id, e){
    e.stopPropagation();
    var action = this.state.stared?"unstar":"star";
    gistStore[action](id).then(()=>this.setState({stared:!this.state.stared}));
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
