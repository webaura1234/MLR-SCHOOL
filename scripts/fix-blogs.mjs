import fs from 'node:fs';
let fileContent = fs.readFileSync('src/lib/blog-posts.ts', 'utf8');

const regex = /content:\s*`([\s\S]*?)`,\s*relatedSlugs/g;
let matches = 0;

fileContent = fileContent.replace(regex, (match, p1) => {
    matches++;
    let intro = '';
    let sections = [];
    let conclusion = '';
    let currentSection = null;
    let currentSubsection = null;

    const lines = p1.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) continue;
        
        if (line.startsWith('<p class="lead">')) {
            intro += line.replace('<p class="lead">', '').replace('</p>', '').trim() + " ";
        }
        else if (line.startsWith('<h2>')) {
            let heading = line.replace('<h2>', '').replace('</h2>', '').trim();
            if (heading === 'Conclusion') {
                let nextLine = lines[i + 1] ? lines[i + 1].trim() : '';
                if (nextLine && nextLine.startsWith('<p>')) {
                    conclusion = nextLine.replace('<p>', '').replace('</p>', '').trim();
                    i++;
                } else if (i + 2 < lines.length && lines[i+2].trim().startsWith('<p>')) {
                    conclusion = lines[i+2].trim().replace('<p>', '').replace('</p>', '').trim();
                    i += 2;
                }
                currentSection = null;
                currentSubsection = null;
            } else {
                currentSection = { heading: heading, content: '', subsections: [] };
                sections.push(currentSection);
                currentSubsection = null;
            }
        }
        else if (line.startsWith('<h3>')) {
            if (currentSection) {
                let heading = line.replace('<h3>', '').replace('</h3>', '').trim();
                currentSubsection = { heading: heading, content: '' };
                currentSection.subsections.push(currentSubsection);
            }
        }
        else if (line.startsWith('<p>')) {
            let pText = line.replace('<p>', '').replace('</p>', '').trim();
            if (currentSubsection) {
                currentSubsection.content += (currentSubsection.content ? " " : "") + pText;
            } else if (currentSection) {
                currentSection.content += (currentSection.content ? " " : "") + pText;
            } else if (!intro && !sections.length) {
                intro += (intro ? " " : "") + pText;
            }
        }
    }

    let replacement = `intro: ${JSON.stringify(intro.trim())},\n    sections: [\n`;
    for (let sec of sections) {
        replacement += `      {\n        heading: ${JSON.stringify(sec.heading)},\n        content: ${JSON.stringify(sec.content)}`;
        if (sec.subsections && sec.subsections.length > 0) {
            replacement += `,\n        subsections: [\n`;
            for (let sub of sec.subsections) {
                replacement += `          {\n            heading: ${JSON.stringify(sub.heading)},\n            content: ${JSON.stringify(sub.content)}\n          },\n`;
            }
            replacement += `        ]\n`;
        } else {
            replacement += `\n`;
        }
        replacement += `      },\n`;
    }
    replacement += `    ],\n    faqs: [],\n    conclusion: ${JSON.stringify(conclusion)},\n    ctaText: "Enquire About Admissions — Malla Reddy School",\n    ctaHref: "/contact",\n    relatedSlugs`;
    return replacement;
});

console.log("Matched blogs:", matches);
fs.writeFileSync('src/lib/blog-posts.ts', fileContent);
