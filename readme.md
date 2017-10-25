## API Basejump: URL Shortener Microservice

### Deployed on Heroku [DEMO](https://shortenURL-yuchiu.herokuapp.com/)

### User stories:
- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- When I visit that shortened URL, it will redirect me to my original link.

#### Example creation usage:
```
https://little-url.herokuapp.com/new/https://www.google.com
```

#### Example creation output
```
{
    "originalUrl": "https://www.google.com",
    "shortenUrl": "https://shortenURL-yuchiu.herokuapp.com/60204"
}
```

#### Usage:

https://shortenURL-yuchiu.herokuapp.com/60204
Will redirect to:
https://www.google.com/

### Local Usage 
#### 1. First install package cross-env globally(Optional)

```
npm i -g cross-env

```
Ensure npm scripts work properly across Linux, Windows, and all environments.

#### 2. install everything else

```
npm install

```

#### 3a. run on localhost

```
npm start

```
Server will be running on http://localhost:3000