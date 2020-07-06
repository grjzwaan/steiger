#!/usr/bin/env node
const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const {getTemplate, create} = require('./index')

program
    .version('0.0.1')
    .arguments('<target-path>')
    .option('-t, --templateDir <dir>', 'Directory containing the templates.')
    .action((target, env) => {
        // Get the information about the templates directory and the target file
        const templateDir = env.templateDir || '.'
        try {
            fs.accessSync(templateDir, fs.constants.F_OK | fs.constants.R_OK)
        } catch (err) {
            console.log(chalk.red('[!]') + ` Directory '${templateDir}' does not exist is is not accessible.`)
            return
        }
        if( fs.existsSync(target) ) {
            console.log(chalk.red('[!]') + ` Target file ${target} already exists. Aborting. `)
            return
        }

        const selected = getTemplate(templateDir, target);
        if(!selected ) {
            console.log(chalk.red('[!]') + ` No matching template found in '${templateDir}'.`)
            return
        }
        console.log(chalk.green('[\u{2713}]') + ` Selected template '${selected}'`)

        // Use the found template to generate the
        create(selected, target)
        console.log(chalk.green(`[\u{2713}]`) + ` Created ${target}`)
    })

program.parse(process.argv);
