import os
import re

base_dir = '/Users/rapakasaketh/Library/Mobile Documents/com~apple~CloudDocs/MALLA REDDY/School/src/app'

# Regex to find metadata block
metadata_pattern = re.compile(r'export const metadata(?:.*?)=\s*\{([\s\S]*?)\};')
title_pattern = re.compile(r'title:\s*([\'"`].*?[\'"`]),?')
desc_pattern = re.compile(r'description:\s*([\'"`][\s\S]*?[\'"`]),?')

for root, dirs, files in os.walk(base_dir):
    if 'page.tsx' in files:
        filepath = os.path.join(root, 'page.tsx')
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        match = metadata_pattern.search(content)
        if match:
            # Check if it already uses constructMetadata
            if 'constructMetadata' in content:
                continue

            metadata_block = match.group(1)
            title_match = title_pattern.search(metadata_block)
            desc_match = desc_pattern.search(metadata_block)
            
            title = title_match.group(1) if title_match else "'Malla Reddy School'"
            desc = desc_match.group(1) if desc_match else "undefined"
            
            # calculate path
            rel_path = os.path.relpath(root, base_dir)
            path_str = '/' if rel_path == '.' else f'/{rel_path}'
            
            # import statement
            import_statement = "import { constructMetadata } from '@/lib/seo';\n"
            
            # new metadata
            if desc != "undefined":
                new_metadata = f"export const metadata = constructMetadata({{\n  title: {title},\n  description: {desc},\n  path: '{path_str}',\n}});"
            else:
                new_metadata = f"export const metadata = constructMetadata({{\n  title: {title},\n  path: '{path_str}',\n}});"
            
            # replace in content
            content = content[:match.start()] + new_metadata + content[match.end():]
            
            # Add import statement after the last import
            last_import_match = list(re.finditer(r'^import .*?;?\n', content, re.MULTILINE))
            if last_import_match:
                last_import_end = last_import_match[-1].end()
                content = content[:last_import_end] + import_statement + content[last_import_end:]
            else:
                content = import_statement + content
            
            # remove `import type { Metadata } from 'next';` if it's there
            content = re.sub(r'import type \{ Metadata \} from \'next\';\n?', '', content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {filepath}')
