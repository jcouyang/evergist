var React = require('react'),
GistCard = require('./gist-card'),
ToolbarMenu = require('./toolbar'),
im=require('immutable'),
{Map, Seq} = im,
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
      gists: Seq(),
      originGists: Seq(),
      selected: null,
      dialog: Map({
        title:"",
        actions: ()=>{}
      })
    }
	},
  componentDidMount: function(){
    this._updateGists()
    db.gist.hook('updating', (mods, primKey, obj)=>{
      console.debug('updating', mods,obj)
    })
    db.gist.hook('creating', (primKey, obj)=>{
      console.debug('createing', obj)
    })
    gists().then(()=>{
      console.debug('transaction completed')
      this._updateGists()
    })
  },
  _updateGists: function(){
    var gists = db.gist.toArray().then((gists)=>{
      console.debug('fetching gists from db and update state')
      this.setState({
        gists: im.fromJS(gists),
        originGists: im.fromJS(gists)
      })
    })
  },
  render: function(){
    var cards = this.state.gists.map((gist, index)=>{
      var selected = this.state.selected===gist.get('id')
      return (
        <div>
          <a name={gist.get('id')} className="anchor"/>
          <GistCard className={selected?'selected':''}
                    checkItem={this._toggleDisplay.bind(this,gist.get('id'))}
                    key={index}
                    index={index}
                    gist={gist}
                    selected={selected}
                    setSelect={this._toggleDisplay}
                    deleteGist={this._onDeleteGist}/>
        </div>
      )
    })
    return (
      <Stage displaySearch={true} onSearch={this._handleSearch}>
        <div className="gist-list">
          <div className="list-container">
            <ToolbarMenu onFilter={this._onFilterChange}
                         className={this._display()?'hidden':''}/>
            {cards.toArray()}
            <NewGist className={(this._display()?"":"hidden ") + "create-gist"} description={this.state.filter}/>
          </div>
        </div>
      </Stage>
    )
  },
  _handleSearch: function(creteria){
    var gists = this.state.originGists.filter((gist)=>new RegExp(creteria,"ig").test(gist.get('description')))
    this.setState({
      gists:gists})
  },
  _display: function(){
    return this.state.gists.size===0
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
  },
  _onFilterChange: function(filter){
    gists[filter]().then((data)=>{
     this.setState({gists:data}) 
    }).catch((error)=>console.log(error))
  }
});

module.exports = GistList;
