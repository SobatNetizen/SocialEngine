import React, { Component } from 'react';
import { TagCloud } from "react-tagcloud";

class cloudChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [
        { value: "JavaScript", count: 38 },
        { value: "React", count: 30 },
        { value: "Nodejs", count: 28 },
        { value: "Express.js", count: 25 },
        { value: "HTML5", count: 33 },
        { value: "MongoDB", count: 18 },
        { value: "CSS3", count: 20 },
        { value: "Reactx", count: 43},
        { value: "Nodejsx", count: 32 },
        { value: "Express.jsxs", count: 15 },
        { value: "HTML5x", count: 60 },
        { value: "MongoDBxs", count: 40 },
        { value: "CSS3x", count: 10 },
        { value: "Haha", count: 38 },
        { value: "Hihi", count: 30 },
        { value: "Hohoho", count: 28 },
        { value: "xixixiJS", count: 25 },
        { value: "Kukuruyuk", count: 33 },
        { value: "MongoDBk", count: 18 },
        { value: "Kuntilanak", count: 20 },
        { value: "Pocong", count: 43},
        { value: "Nodejsxg", count: 32 },
        { value: "Jokoko", count: 15 },
        { value: "kasjaks", count: 60 },
        { value: "aghjsgkahsj", count: 40 }
      ]
    }
  }

  render() {
    return (
      <TagCloud minSize={10}
        maxSize={30}
        shuffle	={true}
        tags={this.state.data}
        onClick={tag => alert(`'${tag.count}' was selected!`)} />
    )
  }
}

export default cloudChart
