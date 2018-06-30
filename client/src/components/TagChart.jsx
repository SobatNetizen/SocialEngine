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
        { value: "Express.jsx", count: 15 },
        { value: "HTML5x", count: 60 },
        { value: "MongoDBx", count: 40 },
        { value: "CSS3x", count: 10 },
        { value: "JavaScript", count: 38 },
        { value: "React", count: 30 },
        { value: "Nodejs", count: 28 },
        { value: "Express.js", count: 25 },
        { value: "HTML5", count: 33 },
        { value: "MongoDB", count: 18 },
        { value: "CSS3", count: 20 },
        { value: "Reactx", count: 43},
        { value: "Nodejsx", count: 32 },
        { value: "Express.jsx", count: 15 },
        { value: "HTML5x", count: 60 },
        { value: "MongoDBx", count: 40 },
        { value: "CSS3x", count: 10 }
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
