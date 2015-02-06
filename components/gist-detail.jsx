var React = require('react')
var GistDetail = React.createClass({
  propTypes: {
    gistHtml: React.PropTypes.string.isRequired,
    display: React.PropTypes.bool
  },
  getInitialState: function() {
		return {
      loading: true,
      innerHtml: ''
    }
	},
  render: function(){
    return (
      <div className={this.props.display?'':'hidden'}>
        <div dangerouslySetInnerHTML={{
            __html: this.props.gistHtml
          }}>
        </div>
      </div>
    )
  }
});

module.exports = GistDetail;
