import { request } from "https://cdn.skypack.dev/@octokit/request";

blogs = myAsyncMethod();
console.log(blogs[0]);
console.log(blogs[1]);
console.log(blogs[2]);

console.log("yes");

async function myAsyncMethod() {
  // regex for getting extension
  var re = /(?:\.([^.]+))?$/;
  const slides_url = "/repos/dklerksbv/dklerksbv.github.io/contents/content/blog/";
  const result = await request("GET " + slides_url);
  const contents = result.data;
  console.log(contents);

  for (let i = 0; i < contents.length; i++) {
    const subfolder = slides_url + contents[i]["name"];
    const result2 = await request("GET " + subfolder);
    const sub_contents = result2.data
    console.log(sub_contents);
    var english_text_file = "";
    var dutch_text_file = "";
    var image_file = "";
    for (let j = 0; j < sub_contents.length; j++) {
       let name = sub_contents[j]["name"];
       let file_parts = re.exec(name);
       if (name == "nl.md") {
         dutch_text_file = sub_contents[j]["path"];
       }
       else if (name == "en.md") {
         english_text_file = sub_contents[j]["path"];
       }
       else if (file_parts[1] == "jpg") {
         image_file = sub_contents[j]["path"];
       }
    }
    return [english_text_file, dutch_text_file, image_file];
  }
}
