var VocabularyApp = React.createClass({
  loadWordsFromServer: function() {
    $.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
  // // "props" are immutable, to implement interactions we add
	// // "state".
	getInitialState: function() {
	    return {data: []};
	},
	// Get the json file
	componentDidMount: function() {
		this.loadWordsFromServer();
	},
  render: function(){
    var wordsNodes = this.state.data.map(function(wordNode){
			return (
				<div>
					{wordNode.ar_word}: {wordNode.es_word}
				</div>
			);
		});
    return(
      <div className="app_box">
        <span className="ar_word">نَحِيفْ</span>:
        <input type="text" placeholder="Translation..." ref="translation" />
        <div>
          {wordsNodes}
        </div>
      </div>
    );
  }
});

var VocabularyBox = React.createClass({
  render: function(){
    return(
      <div>
        <h1>Translate the next word:</h1>
        <VocabularyApp url="vocabulary.json"/>
      </div>
    );
  }
});

// This call render all components that
// we have defined before
React.render(
  <VocabularyBox/>,
  document.getElementById('content')
);
