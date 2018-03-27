import request from 'request'
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
    const furl = new URL(`${repoName[1]}/${pkgName}/stats/code_frequency`, GITHUB.baseUrl);
    console.log(furl)

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
        console.log(info.stargazers_count + ' Stars')
        console.log(info.forks_count + ' Forks')
      }
    }

    const options = {
      url: furl,
      headers: merge(
        {
          'User-Agent': 'request'
        },
        opts.headers || {}
      )
    }

    // request(options, callback)
  }

  return void 0
}
