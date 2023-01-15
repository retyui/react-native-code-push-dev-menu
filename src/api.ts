import {getConfig} from './shared';

import {Deployment} from './types';

const BASE_URL = 'https://api.appcenter.ms/';

const makeRequest = <TResponse>(url: string): Promise<TResponse> => {
  const {readonlyAccessToken} = getConfig();

  return fetch(`${BASE_URL}${url}`, {
    headers: {
      Accept: 'application/json',
      'X-API-Token': readonlyAccessToken,
    },
  }).then(response =>
    response.ok
      ? response.json()
      : response.text().then(text => {
          return Promise.reject(
            new Error(
              `Request failed with status ${response.status} ${text}`,
              // @ts-ignore
              {cause: response},
            ),
          );
        }),
  );
};

export const getDeployments = (): Promise<Deployment[]> => {
  const {appCenterAppName, appCenterOrgName} = getConfig();

  return makeRequest<Deployment[]>(
    `v0.1/apps/${appCenterOrgName}/${appCenterAppName}/deployments`,
  );
};
