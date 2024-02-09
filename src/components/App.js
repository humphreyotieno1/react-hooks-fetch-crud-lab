import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log data to see its structure
        setQuestions(data); // Assuming data is an array of questions directly
      })
      .catch(error => console.error("Error fetching questions:", error));
  }, []);
  

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedQuestions = questions.filter(question => question.id !== id);
        setQuestions(updatedQuestions);
      })
      .catch(error => console.error("Error deleting question:", error));
  };

  const handleUpdateCorrectIndex = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex })
    })
      .then(() => {
        const updatedQuestions = questions.map(question => {
          if (question.id === id) {
            return { ...question, correctIndex };
          }
          return question;
        });
        setQuestions(updatedQuestions);
      })
      .catch(error => console.error("Error updating correct index:", error));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList 
          questions={questions} 
          onDeleteQuestion={handleDeleteQuestion} 
          onUpdateCorrectIndex={handleUpdateCorrectIndex} 
        />
      )}
    </main>
  );
}

export default App;
