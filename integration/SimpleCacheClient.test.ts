import {v4} from 'uuid';
// TODO: deprecating credentials file for now
// import * as fs from 'fs';
// import * as os from 'os';
import {SimpleCacheClient, TimeoutError} from '../src';
import {AlreadyExistsError, NotFoundError} from '../src/Errors';
import {TextEncoder} from 'util';

const AUTH_TOKEN = process.env.TEST_AUTH_TOKEN;
if (!AUTH_TOKEN) {
  throw new Error('Missing required env var TEST_AUTH_TOKEN');
}
const INTEGRATION_TEST_CACHE_NAME = process.env.TEST_CACHE_NAME || 'dummy';

// TODO: deprecating credentials file for now
// const momentoDirName = `${os.homedir()}/.momento`;
// const credsFilePath = `${momentoDirName}/credentials.toml`;
// const createSystemCredentials = (profile?: string) => {
//   const profileName = profile ?? 'default';
//   if (profile) {
//     process.env.MOMENTO_PROFILE = profileName;
//   }
//   if (!fs.existsSync(momentoDirName)) {
//     fs.mkdirSync(momentoDirName);
//   } else {
//     throw new Error(`${momentoDirName} directory exists.
// These integration tests test reading profiles from disk, and create a ~/.momento directory to test this.
// To avoid overriding existing profiles, this error has been thrown.
// If you a want to run these tests, run "mv ~/.momento ~/.momento.bac" to save the current profiles.
// After these tests complete run "mv ~/.momento.bac ~/.momento" to restore the profiles`);
//   }
//   fs.writeFileSync(
//     credsFilePath,
//     `[profile.${profileName}]
// token = "${AUTH_TOKEN}"`
//   );
// };
//
// const removeSystemCredentials = () => {
//   fs.rmSync(momentoDirName, {
//     force: true,
//     recursive: true,
//   });
// };

describe('SimpleCacheClient.ts Integration Tests', () => {
  it('should create and delete a cache', async () => {
    const cacheName = v4();
    const momento = new SimpleCacheClient(AUTH_TOKEN, 1111);
    await momento.createCache(cacheName);
    await momento.deleteCache(cacheName);
  });
});
