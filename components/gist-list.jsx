var React = require('react'),
GistCard = require('./gist-card'),
ToolbarMenu = require('./toolbar'),
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
      originGists: [],
      selected: null,
      dialog: ''
    }
	},
  componentDidMount: function(){

    db.gist.hook('updating', (mods, primKey, obj)=>{
      console.debug('updating', mods,obj)
    })
    db.gist.hook('creating', (primKey, obj)=>{
      console.debug('createing', obj)
    })
    this._updateGists()

    // gists().then(()=>{
    //   console.debug('transaction completed')
    //   this._updateGists()
    // })
  },
  _updateGists: function(){
    var gists = db.gist.toArray().then((gists)=>{
      console.debug('fetching gists from db and update state',toClj(gists))
      this.setState({
        gists:toClj(gists),
        originGists: toClj(gists)
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
    console.log(cards, toJs(cards))
    return (
      <Stage displaySearch={true} onSearch={this._handleSearch} displayLeftNav={true}>
        <div className="gist-list">
          <div className="list-container">
            <ToolbarMenu onFilter={this._onFilterChange}
                         className={this._display()?'hidden':''}/>
            {toJs(cards)}
            <NewGist className={(this._display()?"":"hidden ") + "create-gist"} description={this.state.filter}/>
          </div>
        </div>
      </Stage>
    )
  },
  _handleSearch: function(creteria){
  //   var gists = this.state.originGists.filter((gist)=>new RegExp(creteria,"ig").test(gist.get('description')))
  //   this.setState({
  //     gists:gists})
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
