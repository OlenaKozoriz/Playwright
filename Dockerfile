FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /playwright

COPY . .

RUN npm install

CMD ["npx", "playwright", "test"]