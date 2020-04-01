require('@babel/register')({ extensions: ['.js', '.jsx', '.ts', '.tsx'] });
require('isomorphic-fetch')

function noop() {
    return null;
}

require.extensions['.css'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.jpg'] = noop;
