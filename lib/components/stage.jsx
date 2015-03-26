var React = require('react'),
AppLeftNav = require('./left-nav'),
{AppBar, AppCanvas, TextField,Dialog} = require('material-ui');

var Stage = React.createClass({
  getInitialState:function(){
    return {
      dialog: {
        title: 'dialog',
        actions: {}
      }
    }
  },
  componentDidMount: function(){
    if(this.refs.search)
      this.refs.search.focus()
    $E.on('dialog.showConfirm', data=>{
      console.log('-----------',data)
      var actions = [
        { text: 'Cancel' },
        { text: 'Confirm', onClick: ()=>{
          $E.trigger('dialog.confirm', data.id);
          this.refs.dialog.dismiss();
        }}
      ];
      this.setState({
        dialog:{
          title: data.title,
          actions: actions
        }
      },this.refs.dialog.show);

    })
  },
  render: function(){
    var leftNav;
    if(this.props.displayLeftNav)
      leftNav = <AppLeftNav ref="leftNav" />
    return (
      <div className="stage">
        <Dialog ref="dialog" title={this.state.dialog.title} actions={this.state.dialog.actions}/>
        <AppCanvas predefinedLayout={1}>
           <AppBar className="mui-dark-theme"
                   zDepth={0}
                   title="!gist"
                   onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}
                   icon={this.props.displayLeftNav?this.props.icon:''} >
             <div className={(this.props.displaySearch?"":"hidden ") + "search-toolbar"}>
               <TextField type='search' ref="search" onChange={this._onSearch} name="query" hintText="Search"/>
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
