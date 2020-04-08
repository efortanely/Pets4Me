require('@babel/register')({ extensions: ['.js', '.jsx', '.ts', '.tsx'] });
require('isomorphic-fetch')
require('jsdom-global/register')

function noop() {
    return null;
}
 
window.URL.createObjectURL = noop;

require.extensions['.css'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.jpg'] = noop;