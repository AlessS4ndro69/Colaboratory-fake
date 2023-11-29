import React, { useState } from 'react';
import './Home.css'; // Importa los estilos desde el archivo styles.css

const Home = () => {
  const [codeInput, setCodeInput] = useState('');
  const [outputMessage, setOutputMessage] = useState('');
  const backendUrl = `http://localhost:4000`;

  const runPythonCode = async () => {
    console.log("enviando data:",codeInput);
    try {
      const response = await fetch(`${backendUrl}/run-python-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codeInput }),
      });
      //const response = await fetch(`${backendUrl}/run-python-code?code=${codeInput}`)

      if (!response.ok) {
        console.error('Error al ejecutar el código Python');
        setOutputMessage('Error al ejecutar el código Python');
        return;
      }

      // Obtén el resultado del servidor y actualiza el estado de salida
      const result = await response.text();
      setOutputMessage(result);
    } catch (error) {
      console.error('Error de red:', error);
      setOutputMessage('Error de red al ejecutar el código Python');
    }
  };

  return (
    <div>
      <div id="header">
        <h1>Dev Stream </h1>
      </div>

      <div id="toolbar">
        <button onClick={runPythonCode}>Run</button>
        <button>Save</button>
        {/* Agrega más botones según sea necesario */}
      </div>

      <div id="notebook-container">
        <div id="notebook">
          <textarea
            id="code-input"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Type your Python code here..."
          ></textarea>
        </div>

        <div id="output">
          {/* Aquí iría la salida de la ejecución del código */}
          <p>{outputMessage}</p>
        </div>
      </div>

      <div id="description">
        <h2>Description</h2>
        <p>This is a Google Colab-like React App with a description section. You can use this section to provide additional information about your code or project.</p>
      </div>
    </div>
  );
};

export default Home;
