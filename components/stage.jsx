var React = require('react'),
AppLeftNav = require('./left-nav'),
{AppBar, AppCanvas, Input} = require('material-ui');

var Stage = React.createClass({
  componentDidMount: function(){
    if(this.refs.search)
      this.refs.search.focus()
  },
  render: function(){
    var leftNav;
    if(this.props.displayLeftNav)
      leftNav = <AppLeftNav ref="leftNav" />
    return (
      <div className="stage">
         <AppCanvas predefinedLayout={1}>
           <AppBar className="mui-dark-theme"
                   zDepth={0}
                   title="!gist"
                   onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}
                   icon={this.props.displayLeftNav?this.props.icon:''} >
             <div className={(this.props.displaySearch?"":"hidden ") + "search-toolbar"}>
               <Input type='search' ref="search" onChange={this._onSearch} name="query" placeholder="Search"/>
             </div>
           </AppBar>
           {leftNav}
           <div className="mui-app-content-canvas">
             {this.props.children}
           </div>
         </AppCanvas>
      </div>      
    )
  },
  _onSearch: function(e){
    e.stopPropagation();
		var creteria = e.currentTarget.value;
		this.props.onSearch(creteria);
		return false;
  },
  _onMenuIconButtonTouchTap: function() {
    if(this.props.onMenuIconButtonTouchTap)
      this.props.onMenuIconButtonTouchTap()
    else
      this.refs.leftNav.toggle();
  }
  
})

module.exports = Stage;
