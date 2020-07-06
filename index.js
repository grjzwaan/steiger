const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
const {DateTime} = require('luxon');

function getTemplate(templateDir, target) {
    const parts = path.parse(target);
    const hierarchy = [...path.normalize(parts.dir).split(path.sep), parts.name]
    const ext = parts.ext

    // Find all the possible templates to generate the file
    const candidates = hierarchy.map((v, i, a) => {
        return [...a.slice(0, i), `${v}${ext}`].join(path.sep)
    }).reverse();

    let selected = candidates.filter(e => fs.existsSync(path.join(templateDir, e)));

    if(selected.length < 1) {
        return false
    }
    return path.join(templateDir, selected[0])
}

function create(selected, target) {
    const result = nunjucks.render(selected, { now:DateTime.local() });
    fs.mkdirSync(path.dirname(target), {recursive: true})
    fs.writeFileSync(target, result)
    return true
}

module.exports = {getTemplate, create}