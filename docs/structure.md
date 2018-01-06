# Creating the project structure

## Setting up a clean Node.js/npm package
The first step is getting the basic structure for a Node.js project created and under source control.

The below outlines the basics steps at the Windows command prompt.

```bat
REM Check if the name is already taken (if publishing to NPM), then create the folder if not
npm view ts-appbuilding
mkdir ts-appbuilding
cd ts-appbuilding

REM Create the basic package.json structure
npm init -y
REM Edit package.json to set "license" to "MIT", "author" to "Bill Ticehurst <billti@hotmail.com>"
REM If required (e.g. using async/await), set "engines": {"node": "^8.9.4"}
REM Set other fields as desired, e.g. "repository", "private", etc.
REM See https://docs.npmjs.com/files/package.json for details

REM Create the basic files that npm expects by default
echo console.log("Running the server"); > server.js
echo exports.version = "1.0"; > index.js
echo #TODO > README.md
REM Optionally add LICENSE and CHANGELOG files

REM Check git settings like user.name & user.email, then add to source control
git config -l
git init
echo node_modules/ > .gitignore
git add .
git commit -m "Initial commit"
```

If storing the repo on GitHub, add the repository at https://github.com/new, then add the remote and push, i.e.

```bat
git remote add origin https://github.com/billti/ts-appbuilding.git
git push -u origin master
```

# Other files & folders
Beyond the standard files of index.js, server.js, etc, there are several other "canonical" files & folders, namely:

```text
+-- lib/          # Node.js modules to be loaded by the server
+-- public/       # Content to be served statically to the browser
| +-- media/      # Binary site content such as images, video, etc.
| +-- scripts/    # JavaScript files for the browser
| +-- styles/     # Style-sheets for the browser
| `-- index.html  # Default page for the site
+-- src/          # Higher-level languages that compile to the runtime code
| +-- public/     # Source code for the browser.
| | +-- scripts/  # Source (e.g. TypeScript, Babel, Flow) for .js files in /public/scripts
| | +-- styles/   # Source (e.g. SCSS, LESS) for client .css files in /public/styles
| +-- lib/        # Source for Node.js /lib modules
+-- test/         # Test cases
```

_continue on to [building](build.md)_

# TODO

 - Honor NODE_ENV === 'production'
 - Ensure using SSL. See x-arr-ssl header (see https://tomasz.janczuk.org/2013/12/secure-by-default-with-ssl-in-windows.html)
 - Hot module reloading (maybe?).
   - Investigate https://github.com/glenjamin/webpack-hot-middleware

# Notes

 - Mocha will automatically search and run .js files from the "/test" folder.
