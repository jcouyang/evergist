var React = require('react');
var markdown = require('../stores/markdown');
module.exports = React.createClass({
  render: function(){
    return (
      <div dangerouslySetInnerHTML={{
           __html: this.state.markdown
           }}>
      </div>
    )
  },
  componentDidMount: function(){
    markdown(JSON.stringify({text:this.props.markdown}))
    .then((data)=>{
      this.setState({rendered:data})
    })
  }
})
