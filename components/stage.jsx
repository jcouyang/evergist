var GistList = require('./gist-list'),
React = require('react'),
{AppBar, AppCanvas, Input} = require('material-ui');
var Stage = React.createClass({
  getInitialState: function(){
    return {
      filter: /.*/
    }
  },
  render: function(){
    return (
      <div className="stage">
         <AppCanvas predefinedLayout={1}>
           <AppBar className="mui-dark-theme" zDepth={0} title="!gist">
             <div className="search-toolbar">
               <Input type='search' onChange={this._onSearch} name="query"/>
             </div>
           </AppBar>
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
  }
})

module.exports = Stage;
