/////////////////
/// Functions ///
/////////////////

// This function pops a random element
// from the given array
var getRandom = function(arr){
  var randIndex = Math.floor(Math.random()*arr.length);
  console.log("NUM: " + randIndex);
  console.log("arr[randIndex]: " + arr[randIndex]);
  return arr[randIndex];
}


///////////
/// APP ///
///////////
var VocabularyApp = React.createClass({


  loadWordsFromServer: function() {
    $.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
          data: data,
          wordNode: getRandom(data)
        });
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

  // // "props" are immutable, to implement interactions we add
	// // "state".
	getInitialState: function() {
      // data: are all word objects contained in the json file
      // wordNode: is the current word that we are specting to
      //           be translated
	    return {
        data: [],
        wordNode: {ar_word: '', es_word: ''},
        correct: false
      };
	},

	// Get the json file
	componentDidMount: function() {
		this.loadWordsFromServer();
	},

  handleSubmit: function(e){
		// Prevent the browser's default action of submitting the form
		e.preventDefault();
		// We use the "ref" attribute to assign a name to a child component
		// and this.refs to reference the component
		// We can call React.findDOMNode(component) on a component to get
		// the native browser DOM element
		var input = React.findDOMNode(this.refs.userInput).value.trim();

    // React.findDOMNode(this.refs.userInput).value = '';

    var correct = input===this.state.wordNode.es_word;
    if(correct){
      console.log("CORRECT!!!!");
      this.setState({
        correct: true
      });
    }
	},

  render: function(){
    var wordsNodes = this.state.data.map(function(wordNode){
			return (
				<div>
					{wordNode.ar_word}: {wordNode.es_word}
				</div>
			);
		});
    var checkmark = '';
    if(this.state.correct)
      checkmark = 'highlight'
    return(
      <div className="app_box">
        <form onSubmit={this.handleSubmit}>
          <span className="ar_word">{this.state.wordNode.ar_word}</span>:
          <input type="text" placeholder="Translation..." ref="userInput"/>
          <input type="submit" value="Check" />
          <span className={checkmark}></span>
        </form>
      </div>
    );
    // <div>
    //   {wordsNodes}
    // </div>
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
