import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedSections, setSelectedSections] = useState([]);

    const handleSubmit = async () => {
        try {
            const jsonInput = JSON.parse(input);
            const res = await axios.post('https://my-rest-api-five.vercel.app/bfhl', jsonInput);
            //Added new routes
            setResponse(res.data);
            setError('');
        } catch (err) {
            if (err.response) {
                setError(`Server error: ${err.response.data.error}`);
            } else if (err.request) {
                setError('No response from server');
            } else if (err instanceof SyntaxError) {
                setError('Invalid JSON input');
            } else {
                setError('Error: ' + err.message);
            }
            setResponse(null);
        }
    };

    const handleSectionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedSections(value);
    };

    return (
        <div className="App">
            <h1>Enter your input</h1>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter JSON here, e.g., {"data": ["A", "C", "z"]}'
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <label htmlFor="sections">Select Sections to Display:</label>
                    <select multiple={true} id="sections" onChange={handleSectionChange}>
                        <option value="characters">Characters</option>
                        <option value="numbers">Numbers</option>
                        <option value="highestAlphabet">Highest Alphabet</option>
                    </select>
                    <div>
                        <h2>Filtered Response</h2>
                        {selectedSections.includes('characters') && (
                            <div>
                                <h3>Characters</h3>
                                <pre>{response.alphabets.join(', ')}</pre>
                            </div>
                        )}
                        {selectedSections.includes('numbers') && (
                            <div>
                                <h3>Numbers</h3>
                                <pre>{response.numbers.join(', ')}</pre>
                            </div>
                        )}
                        {selectedSections.includes('highestAlphabet') && (
                            <div>
                                <h3>Highest Alphabet</h3>
                                <pre>{response.highest_alphabet.join(', ')}</pre>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;






