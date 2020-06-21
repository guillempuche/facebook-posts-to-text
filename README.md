# Convert Facebook posts from the Facebook's JSON backup to a text file
## Steps
1. You have to download from Facebook your posts. Then unzip the folder. Finally, look for posts folder with a json file where are all the posts.
2. Move the json file from Facebook ZIP to the same directory that file `main.js`.
3. On your terminal, be in the `main.js`'s directoy, then install the package running this `npm i moment`.
4. Edit code where we import the json file with your file name. Change `require("./xavier_posts.json")` for `require("./your_filename.json")`

## Troubleshooting
- Change the my json file name that I import on the code with the your file name (see step 4).
- Maybe the original json file text isn't in `utf8 latin`. You have to figure out your format, then you change on the code. I think it could depend on the language you use on Facebook.
