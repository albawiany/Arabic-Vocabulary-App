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

var VocabularyMenu = React.createClass({
  loadWordsFromServer: function() {
    var data = getJSON(url);
    if(data!==null){
      this.setState({
        data: data,
        words: data[0].words,
        wordNode: getRandom(data[0].words)
      });
    }
  },

  // Get the json file
	componentDidMount: function() {
		this.loadWordsFromServer();
	},

  render: function(){
    return(
      <div>
        <h1>Select a subject:</h1>
      </div>
    );
  }
});

var VocabularyApp = React.createClass({

  loadData: function(url) {
    console.log("url: " + url);
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          data: data,
          words: data[0].words,
          wordNode: getRandom(data[0].words)
        });
        console.log("******************");
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
        return null;
      }.bind(this)
    });
  },


  loadWordsFromServer: function() {
    var data = this.loadData(this.props.url, this.setState);
    console.log("DATA:");
    console.log(data);
    if(data!==null && data!=undefined){
      console.log("ENTRA");
      console.log(data);
      console.log("length:" + data[0].length);
      this.setState({
        data: data,
        words: data[0].words,
        wordNode: getRandom(data[0].words)
      });
    }
	},

  // // "props" are immutable, to implement interactions we add
	// // "state".
	getInitialState: function() {
      // data: are all word objects contained in the json file
      // wordNode: is the current word that we are specting to
      //           be translated
	    return {
        data: [],
        words: [],
        wordNode: {ar_word: '', es_word: ''},
        correct: false,
        vocabularyStyle: "hideWords",
        showWords: false
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
      this.setState({
        correct: true
      });
    }
	},

  handleClick: function(e){
    // Prevent the browser's default action of submitting the form
    e.preventDefault();
    
    if(!this.state.showWords)
      this.setState({
        vocabularyStyle: "ar-word",
        showWords: true
      });
    else
      this.setState({
        vocabularyStyle: "hideWords",
        showWords: false
      });
  },

  render: function(){
    var wordsNodes = this.state.words.map(function(wordNode){
      console.log(wordNode);
      // In some cases, React requires that each returned element
      // has its own key
      return (
				<div className="word-sol" key={wordNode.es_word}>
					{wordNode.ar_word}: {wordNode.es_word}
				</div>
			);
		});

    var checkmark = '';
    if(this.state.correct)
      checkmark = 'highlight'

    if(this.state.showWords)
      var vocText = "Hide Vocabulary"
    else
      var vocText = "Show Vocabulary"

    return(
      <div className="app_box">
        <form onSubmit={this.handleSubmit}>
          <span className="ar_word">{this.state.wordNode.ar_word}</span>:
          <input type="text" placeholder="Translation..." ref="userInput"/>
          <input type="submit" value="Check" />
          <span className={checkmark}></span>
        </form>


        <div>
          <p><a href="" onClick={this.handleClick}>{vocText}</a></p>
          <div className={this.state.vocabularyStyle}>
            {wordsNodes}
          </div>
        </div>
      </div>
    );
  }
});

var VocabularyBox = React.createClass({
  getInitialState: function() {
    return {
      hideWords: true
    };
  },

  render: function(){
    return(
      <div>
        <h1>Translate the next word:</h1>
        <VocabularyApp url="vocabulary/el_cuerpo.json"/>
      </div>
    );
  }
});

// <VocabularyMenu />
//

// This call render all components that
// we have defined before
React.render(
  <VocabularyBox/>,
  document.getElementById('content')
);
