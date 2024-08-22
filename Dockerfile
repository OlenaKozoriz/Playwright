FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /playwright

COPY . .

RUN npm install

ENV BASE_URL = https://qauto.forstudy.space
ENV HTTP_CREDENTIALS_USERNAME = guest
ENV HTTP_CREDENTIALS_PASSWORD = welcome2qauto

CMD ["npx", "playwright", "test"]