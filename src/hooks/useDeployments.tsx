import {useEffect, useState} from 'react';

import {getDeployments} from '../api';
import {Deployment} from '../types';

interface State {
  isRunning: boolean;
  error: Error | null;
  data: Deployment[];
}

const initialState: State = {
  error: null,
  isRunning: false,
  data: [],
};

export const useDeployments = (): {
  isRunning: boolean;
  deployments: Deployment[];
  error: Error | null;
  onSearch: (value: string) => void;
  onRefresh: () => void;
  search: string;
} => {
  const [search, onSearch] = useState('');
  const [state, setState] = useState<State>(initialState);

  const onRefresh = () => {
    setState(s => ({...s, isRunning: true, error: null}));

    getDeployments()
      .then(data => {
        console.log(' --- xdebug', {data});
        setState(s => ({...s, isRunning: false, data}));
      })
      .catch(error => {
        console.log(' --- xdebug', {error});
        setState(s => ({...s, isRunning: false, error}));
      });
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return {
    isRunning: state.isRunning,
    error: state.error,
    search,
    onSearch,
    onRefresh,
    deployments: state.data.filter((deployment: Deployment) => {
      const isEnabled = deployment?.latest_release?.is_disabled === false;
      const isSearched = search
        ? deployment.name.toLowerCase().includes(search.toLowerCase())
        : true;

      return isEnabled && isSearched;
    }),
  };
};
