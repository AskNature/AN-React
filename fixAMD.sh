#!/bin/bash
sed -i '5i\ \ \"browserify\": {\n    \"transform\": \"deamdify\"\n  },' ./node_modules/scribe-editor/package.json
sed -i '8i\ \ \"browserify\": {\n    \"transform\": \"deamdify\"\n  },' ./node_modules/scribe-editor/node_modules/lodash-amd/package.json
