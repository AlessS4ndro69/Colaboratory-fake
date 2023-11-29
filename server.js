const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { exec } = require('child_process');

// Configura el puerto en el que escuchará el servidor
const port = process.env.PORT || 4000;

// Configura la dirección IP en la que escuchará el servidor
const ip = process.env.IP || '0.0.0.0';



// Configura Express para servir archivos estáticos desde una carpeta llamada "public"
app.use('/public', express.static(path.join(__dirname, 'public')));

// Define una ruta para servir el archivo "Main.js"
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.js'));
});


app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Esta es la respuesta de la ruta GET.');
});

/*app.get('/run-python-code', (req, res) => {
  const  pythonCode  = req.query.code || 'default';

  console.log("data: ",pythonCode);
  // Guardar el código Python en un archivo
  fs.writeFileSync('generated_script.py', pythonCode);

  // Enviar el archivo al cliente para descargar
  res.download('generated_script.py', 'mi_script.py', (err) => {
    if (err) {
      console.error('Error al descargar el archivo:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      // Eliminar el archivo después de la descarga
      fs.unlinkSync('generated_script.py');
      console.log("descargando archivo");
    }
  });
});*/

app.post('/run-python-code', (req, res) => {
  const  pythonCode  = req.body.codeInput;

  console.log("data: ",pythonCode);
  // Guardar el código Python en un archivo
  fs.writeFileSync('./generated_script.py', pythonCode);

  // Enviar el archivo al cliente para descargar
  res.download('generated_script.py', 'mi_script.py', (err) => {
    if (err) {
      console.error('Error al descargar el archivo:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      // Eliminar el archivo después de la descarga
      console.log("realizando la descarga")
      fs.unlinkSync('generated_script.py');
    }
  });
});

app.get('/run_inverted_index', (req, res) => {
  // Comando para ejecutar el script de Python
  const word = req.query.word || 'default';
  const comando = `python script.py ${word}`; // Reemplaza 'mi_script.py' por el nombre de tu archivo Python

  // Ejecuta el script de Python
  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el script: ${error}`);
      return res.status(500).send('Error interno del servidor');
    }
    // Formatea el resultado como un objeto JavaScript (aquí suponemos que es un objeto 'resultadoObj')
  const resultadoObj = { resultado: stdout };

  // Convierte el objeto en una cadena JSON
  const resultadoJSON = JSON.stringify(resultadoObj);

  // Configura el tipo de contenido como JSON y envía la respuesta
  res.setHeader('Content-Type', 'application/json');
  res.send(resultadoJSON);
  });
});

app.get('/run_page_rank', (req, res) => {
  // Comando para ejecutar el script de Python
  const count = req.query.count || 'default';
  const comando = `python3 scriptPR.py ${count}`; // Reemplaza 'mi_script.py' por el >

  // Ejecuta el script de Python
  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el script: ${error}`);
      return res.status(500).send('Error interno del servidor');
    }
    // Formatea el resultado como un objeto JavaScript (aquí suponemos que es un o>
  const resultadoObj = { resultado: stdout };

  // Convierte el objeto en una cadena JSON
  const resultadoJSON = JSON.stringify(resultadoObj);

  // Configura el tipo de contenido como JSON y envía la respuesta
  res.setHeader('Content-Type', 'application/json');
  res.send(resultadoJSON);
  });
});



// Inicia el servidor
app.listen(port, ip, () => {
  console.log(`Servidor escuchando en http://${ip}:${port}`);
})
