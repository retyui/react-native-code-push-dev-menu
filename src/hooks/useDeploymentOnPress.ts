import {useState} from 'react';
import CodePush from 'react-native-code-push';

import {Alert} from 'react-native';

interface Params {
  deploymentKey?: string;
  onProgress?: (progress: number) => void;
}

export const useDeploymentOnPress = ({deploymentKey, onProgress}: Params) => {
  const [isSyncing, setIsSyncing] = useState(false);

  function beginSync() {
    if (!deploymentKey) {
      return;
    }

    setIsSyncing(true);

    CodePush.sync(
      {
        deploymentKey,
        installMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: {},
      },
      undefined,
      function downloadProgress({receivedBytes, totalBytes}) {
        const progress = Number(receivedBytes / totalBytes);

        onProgress?.(progress);
      },
      function handleBinaryVersionMismatch() {
        Alert.alert(
          'Cannot install deployment',
          "The latest release within the configured deployment is targeting a different binary version than what you're currently running",
        );
      },
    )
      .catch(error => {
        Alert.alert(
          'Cannot install deployment',
          `An unexpected error: ${error}`,
        );
      })
      .finally(() => {
        setIsSyncing(false);
      });
  }

  return {
    isSyncing,
    onPress: beginSync,
  };
};
