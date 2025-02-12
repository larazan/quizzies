import React from "react";
import useCategories from "./useCategories";

const GlobalContext = React.createContext();

export const GlobalContextProvider = ({ children }) => {
    const { loading, categories } = useCategories();
    const [quizSetup, setQuizSetup] = React.useState({
        questionCount: 1,
        category: null,
        difficulty: null,
    });
    const [selectedQuiz, setSelectedQuiz] = React.useState(null);
    const [quizResponses, setQuizResponses] = React.useState([]);
    const [filteredQuestions, setFilteredQuestions] = React.useState([]);

    console.log("GlobalContextProvider", categories);
    console.log("Filtered Questions:", filteredQuestions);
    
    return (
        <GlobalContext.Provider 
            value={{
                loading,
                categories,
                quizSetup,
                setQuizSetup,
                selectedQuiz,
                setSelectedQuiz,
                quizResponses,
                setQuizResponses,
                filteredQuestions,
                setFilteredQuestions,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return React.useContext(GlobalContext);
}