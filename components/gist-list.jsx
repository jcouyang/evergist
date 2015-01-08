var React = require('react'),
GistCard = require('./gist-card'),
ToolbarMenu = require('./toolbar'),
{Map, Seq} = require('immutable'),
gists = require('../stores/gists'),
NewGist = require('./new-gist'),
{Dialog} = require('material-ui')
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
    gists().then((data)=>{
      this.setState({
        gists:data,
        originGists:data
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
                    onTitleClick={this._toggleDisplay.bind(this,gist.get('id'))}
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
      <div className="gist-list">
        <div className="list-container">
        <ToolbarMenu onFilter={this._onFilterChange}/>
        {cards.toArray()}
        <NewGist className="create-gist"/>
        </div>
      </div>
    )
  },
  componentWillReceiveProps: function(nextProps){
    var gists = this.state.originGists.filter((gist)=>new RegExp(nextProps.filter,"ig").test(gist.get('description')))
    this.setState({
      gists:gists})
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
