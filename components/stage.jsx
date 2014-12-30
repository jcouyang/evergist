var GistList = require('./gist-list')

var Stage = React.createClass({
  render: function(){
    return (
      <div className="stage">
        <GistList/>
      </div>      
    )
  }
})

module.exports = Stage;
