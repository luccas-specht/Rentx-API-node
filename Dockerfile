# qual imagem baixar pro container
FROM node

# como saber as imagens que estão disponiveis?
# https://hub.docker.com/search?type=image

# quando ele rodar a criação do container, vamos definir um diretorio onde essas informaçõesestarão contidas
WORKDIR /usr/app

# copia o packege.json para dentro do workdir
COPY package.json ./

# rodar comando para baixar as dependencias
# utilizar o npm, pois nem todas as imgs já veem com o yarn instalado.
RUN npm install

# agora tu copia tudo pra dentro da pasta definida no workdir
COPY . .

# expoe a porta que está sendo utilizada
EXPOSE 3333

# permite que rode os comandos que precisam ser rodados
CMD ["npm","run","dev"]