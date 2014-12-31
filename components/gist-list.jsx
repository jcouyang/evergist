var React = require('react'),
GistCard = require('./gist-card'),
ToolbarMenu = require('./toolbar'),
{Map, Seq} = require('immutable'),
gists = require('../stores/gists')

var GistList = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getInitialState: function() {
		return {
      loading:true,
      gists: Seq(),
      selected: null
    }
	},
  componentDidMount: function(){
    gists().then((data)=>{
      this.setState({
        gists:data
      })
    })
  },
  render: function(){
    var cards = this.state.gists.map((gist, index)=>{
      return (
        <a onClick={this._toggleDisplay.bind(this,gist.get('id'))}>
          <GistCard scrollTop={index*111} key={gist.get('id')} gist={gist} selected={this.state.selected===gist.get('id')} setSelect={this._toggleDisplay}/>
        </a> 
      )
    })
    return (
      <div className="gist-list">
        <div className="list-container">
        <ToolbarMenu onFilter={this._onFilterChange}/>
        {cards.toArray()}
        </div>
      </div>
    )
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
