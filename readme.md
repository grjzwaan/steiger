# Steiger
Steiger is a simple CLI to scaffold new files from Nunjucks templates. It assumes that your content is organized hierarchically and your templates as well.   

For example:
```bash
steiger -t ./templates posts/2020/06/02/amazing-new-content-I-am-a-hero.md
```
creates the file `posts/2020/06/02/amazing-new-content-I-am-a-hero.md` based on a template in `./templates`.

This command will search for increasingly specific template files matching the `.md` extension:

* `./templates/posts.md`
* `./templates/posts/2020.md`
* `./templates/posts/2020/06.md`
* `./templates/posts/2020/06/02.md`
* `./templates/posts/2020/06/02/amazing-new-content-I-am-a-hero.md`

Using the most specific template it uses [Nunjucks](https://mozilla.github.io/nunjucks/) to generate the new file. Currently it only inserts the current DateTime using [Luxon](https://moment.github.io/luxon/).