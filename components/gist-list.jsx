var React = require('react'),
GistCard = require('./gist-card'),
ToolbarMenu = require('./toolbar'),
{Map, List} = require('immutable'),
gists = require('../stores/gists')

var GistList = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getInitialState: function() {
		return {
      loading:true,
      gists: List()
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
    var cards = this.state.gists.map((gist)=>{
      return (
        <a onClick={this._showDetail.bind(this, gist.get('id'))}>
          <GistCard gist={gist}/>
        </a> 
      )
    })
    return (
      <div className={this.props.layout + "gist-list columns"}>
        <div className="list-container">
        <ToolbarMenu/>
        {cards.toArray()}
        </div>
      </div>
    )
  },
  _showDetail: function(id){
    this.props.showDetail(true, id)
  }
});

module.exports = GistList;
