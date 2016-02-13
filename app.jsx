var VocabularyApp = React.createClass({
  render: function(){
    return(
      <div className="app_box">
        <span className="ar_word">نَحِيفْ</span>:
        <input type="text" placeholder="Translation..." ref="translation" />
      </div>
    );
  }
});

var VocabularyBox = React.createClass({
  render: function(){
    return(
      <div>
        <h1>Translate the next word:</h1>
        <VocabularyApp/>
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
