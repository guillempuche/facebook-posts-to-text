const fs = require("fs");
const moment = require("moment");
moment.locale("es-CA");

// node -e 'require("./main").main()'
module.exports.main = () => {
	// Get json file.
	const json = require("./xavier_posts.json");
	// Transform json file to json object.
	const jsonObject = json.filter(el => el.data);

	// Get only the posts with text.
	const list = jsonObject.map(item => {
		// Get the date post.
		const date = moment(item.timestamp * 1000)
			.format("D-M-YYYY dddd H:mm")
			.toUpperCase();

		// Get the text (it is utf8 latin) of the post.
		const postData = item.data.find(el => el.post);
		if (!postData) return "";
		const post = Buffer.from(postData.post, "latin1").toString("utf-8");

		// Get the URL that is attached on the post if it exists.
		var externalContextUrl = undefined;
		if (item.attachments) {
			item.attachments.find(
				el =>
					el.data &&
					el.data.find(i => {
						if (i.external_context && i.external_context.url) {
							externalContextUrl = i.external_context.url;
							return true;
						} else return false;
					})
			);
		}

		return `\n${date}\n\n${post || ""}\n${
			externalContextUrl ? `\n********WEB ADJUNTA: ${externalContextUrl}\n` : ""
		}\n\n============================`;
	});

	// Convert array to a long string and sepearate every element without commas.
	const content = list.join("");

	// Write the content in a file `.txt`.
	fs.writeFile("xavier_posts_output.txt", content, "utf8", err => {
		if (err) {
			console.warn("An error occured while writing JSON Object to File.");
			return console.log(err);
		}

		console.log("JSON file has been saved.");
	});
};

module.exports.test = () => {
	// 	var result;
	// 	var buffer = Buffer.from(
	// 		"Guillem Puche actualiz\u00c3\u00b3 su estado.\n\n...Explore!",
	// 		"latin1"
	// 	);
	// 	// result = sentence.replace("\u005C+u+([a-z]|[0-9]){4,4}", "!a");
	// 	// result = decodeURIComponent("\u00e2\u0080\u0099");
	// 	// result = "\u00e2\u0080\u0099".charCodeAt(0).toString(16);
	// 	var bufferEncode = "latin1";
	// 	var buf1 = Buffer.from("T\u00e2\u0080\u0099", bufferEncode);
	// 	console.log(buf1);
	// 	resultEncode = "utf-8";
	// 	buf1 = buffer;
	// 	result = buf1.toString(resultEncode);
	// 	console.log(result);
};
