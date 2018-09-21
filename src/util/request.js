import axios from 'axios';
import config from '../config/config';

/**
 * @method Request
 * @param {object} configs
 *
 * @return {promise}
 */

const Request = (configs = {}) => {
  const baseUrl = configs.baseUrl || config.baseUrl;
  const url = baseUrl + configs.path;
  const localDefaultHeaders = localStorage.defaultHeaders || '{}';
  const defaultHeaders = JSON.parse(localDefaultHeaders);
  const headers = { ...configs.headers, ...defaultHeaders };
  configs = { ...configs, headers, url };
  return axios(configs);
};

/**
 * @method addDefaultHeader
 * @param {string} key
 * @param {string} value
 */

export const addDefaultHeader = (key, value) => {
  if (!localStorage.defaultHeaders) {
    localStorage.defaultHeaders = '{}';
  }

  localStorage.defaultHeaders = JSON.stringify({
    ...JSON.parse(localStorage.defaultHeaders),
    [key]: value,
  });
};

/**
 * @method addDefaultHeader
 * @param {string} key
 * @param {string} value
 */

export const removeDefaultHeader = key => {
  let defaultHeadersStorage = JSON.parse(localStorage.defaultHeaders);
  delete defaultHeadersStorage[key];
  localStorage.defaultHeaders = JSON.stringify(defaultHeadersStorage);
};


export const formatPatchData = (data, prefix) => {
  let patch = [];
  let seperator = "/";
  if(!prefix) prefix = '';

  if(data !== null && typeof data === 'object'){
    Object.keys(data).map(key => {
      if(Array.isArray(data[key])){
        data[key].map((val, index) => {
          patch = patch.concat(formatPatchData(val, [prefix, key, index].join(seperator)))
        });
      } else if(data[key] !== null && typeof data[key] === 'object'){
        Object.keys(data[key]).map( index => {
          patch = patch.concat(formatPatchData(data[key][index], [prefix, key, index].join(seperator)))
        });
      } else {
        patch.push({
          "value": data[key],
          "path": [prefix, key].join(seperator),
          "op": "replace"
        });
      }
    })
  } else {
    patch.push({
      "value": data,
      "path": prefix,
      "op": "replace"
    });
  }

  return patch;
};


export const GET = (path, configs = {}) => Request({ ...configs, path, method: 'GET' });
export const POST = (path, configs = {}) => Request({ ...configs, path, method: 'POST' });
export const PATCH = (path, configs = {}) => Request({ ...configs, path, method: 'PATCH' });
export const PUT = (path, configs = {}) => Request({ ...configs, path, method: 'PUT' });
export const DELETE = (path, configs = {}) => Request({ ...configs, path, method: 'DELETE' });

export default Request;
