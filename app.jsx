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
//////////
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
    // for(var i=0; i<this.state.data.length; i++){
    //     console.log(this.state.data[i][0] + ": " + this.state.data[i][1]);
    // }
    var wordArr = getRandom(this.state.data);
    if(wordArr!==undefined){
      var arWord = wordArr.ar_word;
      var esWord = wordArr.es_word;
      console.log("wordArr[0]: " + wordArr.ar_word);
    }
    return(
      <div className="app_box">
        <span className="ar_word">{arWord}</span>:
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
