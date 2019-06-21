import React, {Component} from 'react';
import './App.scss';

const newQuiz = [{
  name: "Food Quiz",
  author:"Zachary",
  questions: [
    {
      questionName:"Do you like food?",
      answers: [
        {
          text:"Bananas"
        },
        {
          text: "Apples"
        },
        {
          text:"Oranges"
        }
      ]
    }
  ]
},
{
  name: "Food Quiz",
  author:"Zachary",
  questions: [
    {
      questionName:"Do you like food?",
      answers: [
        {
          text:"Bananas"
        },
        {
          text: "Apples"
        },
        {
          text:"Oranges"
        }
      ]
    }
  ]
}]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
    }
  }

  componentDidMount() {
    // fetch('http://localhost:8080/get-all-quizzes')
    // .then(response => {
    //   return response.json();
    // })
    // .then(myJson => {
    //   console.log(myJson);
      this.setState({
        quizzes: newQuiz //myJson
      });
   // });
  }

  handleAddQuiz = (e) => {
    e.preventDefault();
    console.log(e);
    fetch('http://localhost:8080/add-quiz', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newQuiz),
    })
    .then(res => {
      if(res.status === 200) {
        console.log("Quiz added")
        console.log(newQuiz);
      } else {
        console.log("something died")
      }
    })
    .catch(err => {
      console.log(err)
    });
  }
  render() {
    return (
      <div className="App">
        <div className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">OpenQuiz</span>
          <i className="far fa-plus-square add-icon" onClick={e => this.handleAddQuiz(e)}></i>
        </div> 
        <div className="container">
        
        {this.state.quizzes.map((quiz, index) => {
          return(
            <div className="card">
              <div className="card-body">
              <div key={index}>
              <p>Quiz Name: {quiz.name}</p>
              <p>Author: {quiz.author}</p> 
              {quiz.questions.map((question, index) => {
                return(
                  <div key={index}>
                    <p>Question {index+1}: {question.questionName}</p>
                    {question.answers.map((answer, index) => {
                      return(
                        <div key={index}>
                          <p>Answer {index+1}: {answer.text}</p>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
              
              
            </div>
              </div>
            </div>
          
            
          )
        })}
        </div>
      </div>
    );
  }
  
}

export default App;
