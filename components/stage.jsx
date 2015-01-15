var GistList = require('./gist-list'),
React = require('react'),
AppLeftNav = require('./left-nav'),
{AppBar, AppCanvas, Input} = require('material-ui');

var Stage = React.createClass({
  getInitialState: function(){
    return {
      filter: ''
    }
  },
  componentDidMount: function(){
    this.refs.search.focus()
  },
  render: function(){
    return (
      <div className="stage">
         <AppCanvas predefinedLayout={1}>
           <AppBar className="mui-dark-theme" zDepth={0} title="!gist" onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}>
             <div className="search-toolbar">
               <Input type='search' ref="search" onChange={this._onSearch} name="query" placeholder="Search"/>
             </div>
           </AppBar>
           <AppLeftNav ref="leftNav" />
           <div className="mui-app-content-canvas">
             <GistList filter={this.state.filter}/>
           </div>
         </AppCanvas>
      </div>      
    )
  },
  _onSearch: function(e){
    e.stopPropagation();
		var creteria = e.currentTarget.value;
		this.setState({filter:creteria});
		return false;
  },
  _onMenuIconButtonTouchTap: function() {
    this.refs.leftNav.toggle();
  }
  
})

module.exports = Stage;
