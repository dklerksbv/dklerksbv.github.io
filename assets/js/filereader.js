import { request } from "https://cdn.skypack.dev/@octokit/request";

export async function getFolderInfo() {
  // regex for getting extension
  const re = /(?:\.([^.]+))?$/;
  const folder_url = "/repos/dklerksbv/dklerksbv.github.io/contents/content/blog/";
  const result = await request("GET " + folder_url);
  const contents = result.data;

  let folders = [];

  for (let i = 0; i < contents.length; i++) {
    const subfolder_name = contents[i]["name"];
    const subfolder = folder_url + subfolder_name;
    const result2 = await request("GET " + subfolder);
    const sub_contents = result2.data
    let english_text_file = "";
    let dutch_text_file = "";
    let image_file = "";
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
    let folder_details = {
      "subfolder_name": subfolder_name,
      "english_text_file": english_text_file,
      "dutch_text_file": dutch_text_file,
      "image_file": image_file,
    };
    folders.push(folder_details);
  }
  folders.sort(function(a,b) {
    return b.subfolder_name.localeCompare(a.subfolder_name);
  });
  return folders;
}
