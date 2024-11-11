# Usar a imagem oficial do Node.js
FROM node:18

# Diretório de trabalho para o backend
WORKDIR /app

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código fonte do backend
COPY . .

# Expor a porta 3000 (ou qualquer outra que seu servidor esteja ouvindo)
EXPOSE 3000

# Comando para rodar a aplicação Node.js
CMD ["npm", "start"]
