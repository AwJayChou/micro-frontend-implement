export async function importHtml(entry) {
    let content = await loadSource(entry)
    // console.log(content)
    parseScript(content, entry)
    parseCSS(content, entry)
    parseBody(content)
}

function loadSource(url) {
    return window.fetch(url).then(res => res.text())
}

const ATTR_RE = /["'=\w\s]*/.source

function parseBody(content) {
    const BODY_RE = /<body>([\w\W]*)<\/body>/g
    const SCRIPT_RE = /<script["'=\w\s]>[\s\S]*<\/script>/g
    let bodyContent = content.match(BODY_RE)
    let script = content.match(SCRIPT_RE)
    console.log({
        bodyContent,
        script
    })
    return {
        bodyContent,
        script
    }
}

function parseCSS(content, entry) {
    const CSS_LINK_RE = new RegExp('<link' + ATTR_RE + 'href="([^"]+.css[^"]*)"' + ATTR_RE+'>', 'g')
    const SYTLE_CONTENT_RE = new RegExp('<style>([^<].*)<\/style>', 'g')
    const common = new RegExp('(?: '+ CSS_LINK_RE +')|(?:' +SYTLE_CONTENT_RE+')', 'g')
    let match;
    let css = [];
    let styles = [];
    while((match = CSS_LINK_RE.exec(content))) {
        css.push(match[1].trim())
    }
    console.log(content)
    while((match = SYTLE_CONTENT_RE.exec(content))) {
        console.log('match ', match)
        styles.push(match[1].trim())
    }
    // while(match = common.exec(content)) {
    //     if(match[1]) {
    //         css.push(match[1].trim())
    //     } else {
    //         styles.push(match[2].trim())
    //     }
    // }
    css = css.map(css => {
        return /http/.test(css) ? css : entry + css
    })
    console.log({ css, styles })
    return { css, styles }
}

function parseScript(content, entry) {
    const SCRIPT_CONTENT_RE = new RegExp('<script' + ATTR_RE + '>([\\w\\W]*)<\/script>', 'g')
    const SCRIPT_SRC_RE = new RegExp('<script' + ATTR_RE + 'src="(.+)"'+ ATTR_RE +'>', 'g');
    let scripts = [];
    let scriptUrls = [];
    let match = '';
    while((match = SCRIPT_CONTENT_RE.exec(content))) {
        scripts.push(match[1])
    }
    while((match = SCRIPT_SRC_RE.exec(content))) {
        scriptUrls.push(match[1])
    }
    scriptUrls = scriptUrls.map(url => {
        return /http/.test(url) ? url : entry + url
    })
    console.log('scripts', { scripts, scriptUrls })
    return { scripts, scriptUrls }
}