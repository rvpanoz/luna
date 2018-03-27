import request from 'request-promise-native'
import { GITHUB } from '../constants/AppConstants'
import { URL } from 'url';
import {merge} from 'ramda';

export function fetchStats(opts) {
  const { repoUrl, pkgName } = opts

  if (!repoUrl || !pkgName) {
    throw new Error(
      'fetchReleases: repoUrl and pkgName are required parameters'
    )
  }

  const url = new URL(repoUrl);

  if(!url) {
    throw new Error('cannot parse repoUrl')
  }

  const repoName = url.pathname && url.pathname.split('/');

  if(repoName && repoName[1]) {
    const furl = new URL(`${repoName[1]}/${pkgName}`, GITHUB.baseUrl);
    console.log(furl.href)
    const options = {
      url: furl,
      headers: merge(
        {
          'User-Agent': 'request'
        },
        opts.headers || {}
      )
    }
    return request(options)
  }
}
