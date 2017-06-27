const fs = require("fs");

function mergeValues(values, content) {
    for (let key in values) {
        const value = values[key];
        content = content.replace(`{{${key}}}`, value);
    }
    return content;
}

function view(templateName, values, response) {
    //Read from the template file
    let fileContents = fs.readFileSync(`./views/${templateName}.html`).toString();
    //Insert values in to the content
    fileContents = mergeValues(values, fileContents);
    //Write out the contents to the response
    response.write(fileContents);
}

module.exports.view = view;