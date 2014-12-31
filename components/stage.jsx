var GistList = require('./gist-list'),
React = require('react'),
{AppBar, AppCanvas, Input} = require('material-ui');
var Stage = React.createClass({
  render: function(){
    return (
      <div className="stage">
         <AppCanvas predefinedLayout={1}>
           <AppBar className="mui-dark-theme" zDepth={0} title="!gist">
             <div className="search-toolbar">
               <Input type='search'/>
             </div>
           </AppBar>
           <div className="mui-app-content-canvas">
             <GistList/>
           </div>
         </AppCanvas>
      </div>      
    )
  }
})

module.exports = Stage;
