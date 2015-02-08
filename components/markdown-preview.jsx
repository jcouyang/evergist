var React = require('react');
var markdown = require('../stores/markdown');
module.exports = React.createClass({
  getInitialState: function(){
    return {
      rendered: ''
    }
  },
  render: function(){
    return (
      <div dangerouslySetInnerHTML={{
           __html: this.state.rendered
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
