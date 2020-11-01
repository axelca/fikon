import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [fikon, setFikon] = useState('');
  const [copied, setCopied] = useState(false);

  const firstVowel = (word) => word.search(/[aeiouyåäö]/i);

  const calculateFikon = (str) =>
    str
      .trim()
      .split(' ')
      .map((word) => {
        const firstVow = firstVowel(word);
        if (firstVow > 0) {
          word = word.split('');
          return (
            'fi' +
            word.slice(firstVow + 1, word.length).join('') +
            ' ' +
            word.slice(0, firstVow + 1).join('') +
            'kon'
          );
        } else if (word) {
          return 'fi ' + word + 'kon';
        } else {
          return '';
        }
      })
      .join(' ')
      .toLowerCase();

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(fikon);
    setCopied(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  return (
    <div className="App">
      <h1>Fikonify</h1>
      <label>
        <div>Enter text:</div>
        <input
          autoFocus
          placeholder="Text to translate"
          type="text"
          onChange={(e) => setFikon(calculateFikon(e.target.value))}
        />
      </label>
      {fikon.length > 0 && <h2>Result</h2>}
      <div
        onClick={fikon.length > 0 && copyToClipBoard}
        className={copied ? 'fikon active' : 'fikon'}
      >
        {fikon}
      </div>
      <div className={copied ? 'copied active' : 'copied'}>
        Fikon copied to clipboard!
      </div>
    </div>
  );
};

export default App;
