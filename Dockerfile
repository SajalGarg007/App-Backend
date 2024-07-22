# FROM node:14-alpine AS builder

# # Define working directory
# WORKDIR "/NH-POC"

# COPY . .
# RUN npm ci
# RUN npm run build
# RUN npm prune --production


# FROM node:14-alpine AS production

# WORKDIR "/NH-POC"
# EXPOSE 3001
# COPY  .env ./dist/.env
# COPY  package.json ./package.json
# COPY  package-lock.json ./package-lock.json
# COPY  dist ./dist
# COPY  node_modules ./node_modules

# CMD [ "sh", "-c", "npm run start:prod"]

# New My File

FROM node:18 as builder

WORKDIR /build

COPY package*.json .
RUN npm install

COPY dist/ dist/
COPY src/ src/
COPY tsconfig.json tsconfig.json

RUN npm run build

FROM node:18 as runner

WORKDIR /app

COPY --from=builder build/package*.json ./
COPY --from=builder build/node_modules ./node_modules
COPY  .env ./dist/.env
COPY  dist ./dist

CMD ["npm" , "start"]