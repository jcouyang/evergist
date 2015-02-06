var React = require('react'),
Hidable = require('./hidable');
var GistDetail = React.createClass({
  propTypes: {
    gistHtml: React.PropTypes.string.isRequired,
    display: React.PropTypes.bool
  },
  render: function(){
    return (
      <Hidable display={this.props.display}>
        <div dangerouslySetInnerHTML={{
            __html: this.props.gistHtml
          }}>
        </div>
      </Hidable>
    )
  }
});

module.exports = GistDetail;
