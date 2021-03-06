var React = require('react'),
GistCard = require('./gist-card'),
ToolbarMenu = require('./toolbar'),
Loading = require('./loading'),
gists = require('../stores/gists'),
NewGist = require('./new-gist'),
Stage = require('./stage'),
{Dialog, FloatingActionButton} = require('material-ui'),
    db = require('../stores/db');
var GistList = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getInitialState: function() {
		return {
      loading:true,
      gists: [],
      selected: null,
      dialog: ''
    }
	},
  componentDidMount: function(){
    this._updateGists();
    gists().then(()=>{
      this._updateGists()
    })
  },
  _updateGists: function(){
    db.gist.orderBy('updated_at').desc().toArray().then((gists)=>{
      this.setState({
        gists:toClj(gists),
        loading: false
      })
    })
  },
  render: function(){
    var cards = map((gist,index)=>{
      var selected = this.state.selected===get(gist,'id')
      return (
              <div>
		      <a name={get(gist,'id')} className="anchor"/>
		      <GistCard className={selected?'selected':''}
			      checkItem={this._toggleDisplay.bind(this,get(gist,'id'))}
			      key={index}
			      index={index}
			      gist={gist}
			      selected={selected}
			      setSelect={this._toggleDisplay}
			      deleteGist={this._onDeleteGist}/>
             </div>
      )
    }, this.state.gists)
    return (
      <Stage displaySearch={true} onSearch={this._handleSearch} displayLeftNav={true}>
        <div className="gist-list">
          <Loading loading={this.state.loading}/>
          <div className="list-container">
            {toJs(cards)}
            <NewGist className={(this._display()?"":"hidden ") + "create-gist"} description={this.state.filter}/>
          </div>
        </div>
        <a href="#/new">
          <FloatingActionButton iconClassName="fa fa-plus" className="action-new" secondary={true}/>
        </a>
      </Stage>
    )
  },
  _handleSearch: function(creterias){
    if(creterias){
      db.gist.toArray((gists)=>{
        gists = filter(
          gist=>every(
            creteria=>RegExp(creteria,'ig').test(gist.content),
            creterias.split(' ')),
          gists);
        this.setState({gists:toClj(gists)});
      })
    }else{
      db.gist.toArray((gists)=>{
        this.setState({gists:toClj(gists)})
      })
    }
  },
  _display: function(){
    return count(this.state.gists)===0
  },
  _onDeleteGist:function(id){
    db.gist.delete(id).then(this._updateGists);
  },
  _toggleDisplay: function(id){
    if(this.state.selected!=id){
      this.setState({
        selected: id
      })
    }
    else{
      this.setState({selected: null})
    }
  }
});

module.exports = GistList;
