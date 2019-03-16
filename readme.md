### How to run the project

---

There are several ways to run the project.

1. Using a server

   -  Open the index.html file in the dist folder using a server.
   -  If you are using visual studio code, an extension such as live server works
   -  Editors such as sublimetxt, atom, brackets have a live server plugin that can serve html files

2) Using npm

```sh
 # This installs the dependancies needed to compile and serve the files
   npm install

# This runs the project on wepack dev server
   npm run start
```

-  The node-sass module if often tricky to install so if the installation above doesn't work or brings up errors try installing node-sass first then repeat the commands above.
-  On windows

```sh
   npm i -D node-sass
```

-  On linux

```sh
   # Avoid using sudo
   npm i -D node-sass
```
