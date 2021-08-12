import React, { Component } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

export class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      index: 0,
      color: "#BFD8D5",
    };
    this.handleClick = this.handleClick.bind(this);
  }
  randomIndex = () => {
    const colors = ["#BFD8D5", "#F9D4C2", "#F7EBC5", "#C4DEF2", "#C2D3F2"];
    const { quotes } = this.state;
    this.setState({
      index: Math.floor(Math.random() * quotes.length),
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  };
  handleClick = () => {
    this.randomIndex();
    //document.style.backgroundColor = this.state.color;
  };
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          quotes: res.quotes,
        })
      );
  }
  render() {
    const { quotes, index } = this.state;
    const quote = quotes[index];
    //console.log(quote);
    console.log(this.state.color);
    this.state.color
      ? (document.body.style.backgroundColor = this.state.color)
      : (document.body.style.backgroundColor = "#BFD8D5");
    return (
      <div id="quote-box">
        {quote && (
          <div id="text">
            <FaQuoteLeft style={{ fontSize: "2em" }} />
            <span> {quote.quote}</span>
          </div>
        )}
        {quote && (
          <div id="author">
            - <span>{quote.author}</span>
          </div>
        )}
        <div className="btn-wrapper">
          <button
            className=" btn twitter-btn"
            style={{ backgroundColor: this.state.color }}
          >
            <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">
              <FiTwitter style={{ fontSize: "3em" }} />
            </a>
          </button>
          <button
            id="new-quote"
            onClick={this.handleClick}
            style={{ backgroundColor: this.state.color }}
            className="btn"
          >
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default QuoteBox;
