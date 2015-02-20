var React = require('react'),
Loading = require('./loading'),
Hidable = require('./hidable');
var GistDetail = React.createClass({
  propTypes: {
    gistHtml: React.PropTypes.string.isRequired,
    display: React.PropTypes.bool
  },
  render: function(){
    return (
      <Hidable display={this.props.display}>
        <Loading loading={this.props.loading}/>
        <div dangerouslySetInnerHTML={{
            __html: this.props.gistHtml
          }}>
        </div>
      </Hidable>
    )
  }
});

module.exports = GistDetail;
