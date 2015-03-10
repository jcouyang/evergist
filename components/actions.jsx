var React =require('react');
var Action = React.createClass({
  render: function(){
    <FloatingActionButton icon={this.props.stared?'navigation-close':'action-grade'}
                          onTouchTap={this.props.onStarGist.bind(this,this.props.gist.get('id'))}
                          className={this.props.actionButtonClass() + "action-button star"}
                          mini={true}/>
    <FloatingActionButton icon={this.props.edit?'image-remove-red-eye':'editor-mode-edit'}
                          onTouchTap={this.props.handleEditGist}
                          className={this.props.className + " action-button edit"}
                          mini={true}/>

  },
  _onStarGist: function(id, e){
    e.stopPropagation();
    var starUnstarGist = this.props.stared?gistStore.unstar:gistStore.star;
    starUnstarGist(id).then(()=>this.setState({stared:!this.props.stared}));
  }

})

module.exports = Action;
