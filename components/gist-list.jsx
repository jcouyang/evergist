var React = require('react'),
GistCard = require('./gist-card'),
ToolbarMenu = require('./toolbar'),
Loading = require('./loading'),
gists = require('../stores/gists'),
NewGist = require('./new-gist'),
Stage = require('./stage'),
{Dialog} = require('material-ui'),
db = require('../stores/db')
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
    this._updateGists()
    gists().then(()=>{
      this._updateGists()
    })
  },
  _updateGists: function(){
    db.gist.toArray().then((gists)=>{
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
  _onDeleteGist:function(key){
    console.log(key)
    this.setState({gists:this.state.originGists.delete(key)})
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
