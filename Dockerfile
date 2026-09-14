# 1. Imagem base — Node 22 versão Alpine (leve, ~50MB vs ~1GB da versão full)
FROM node:22-alpine

# 2. Define pasta de trabalho dentro do container
WORKDIR /app

# 3. Copia package.json e package-lock.json (só esses primeiro — pro cache)
COPY package*.json ./

# 4. Instala dependências
RUN npm install

# 5. Copia o resto do código
COPY . .

# 6. Gera Prisma Client (precisa do schema.prisma copiado)
RUN npx prisma generate

# 7. Documenta que a API usa porta 3000
EXPOSE 3000

# 8. Comando de start quando container liga
CMD ["npx", "tsx", "src/server.ts"]
