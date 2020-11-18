#Frontend

__Using:__

- React Hooks
- Redux
- Axios

__Structure:__

- api (backend)
- assets (static css/fonts/img/js)
- src (develop directory)
    - api (all custom api functions using by axios)
    - axios (global axios)
    - common (additional components and other)
    - modules (main components)
    - redux (create store & get reducers from modules / components)
    - template
   
__Config to start:__

According to use browser-sync-webpack-plugin in develop mode,
you should set `localhost = 'http://your.site'` (webpack.config.js)
    
Install:
```
yarn
```

Production:
```
yarn build
```

Develop:
```
yarn dev
yarn eslint
```
