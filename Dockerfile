# Usa una imagen base de Node.js 16
FROM node:16

# Establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto 3000 (ajusta según sea necesario)
EXPOSE 3000

# ENTRYPOINT ["npm", "start"]

# Comando para ejecutar la aplicación usando npm start
CMD ["npm", "start"]
