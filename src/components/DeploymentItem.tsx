import React, {useRef, FC} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import {Deployment} from '../types';
import {formatBytes} from '../utils';
import {useDeploymentOnPress} from '../hooks/useDeploymentOnPress';

import {Progress} from './Progress';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deploymentContainer: {
    flexDirection: 'row',
  },
  deploymentName: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
  },
  releaseInfoContainer: {
    padding: 12,
    marginTop: 4,
  },
  info: {
    fontSize: 14,
  },
});

interface Props {
  name: string;
  releaseInfo?: Deployment['latest_release'];
  isCurrent?: boolean;
  deploymentKey?: string;
}

const noop = () => {};

const toFormattedDate = (date: number): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};

export const DeploymentItem: FC<Props> = ({
  name,
  releaseInfo,
  deploymentKey,
  isCurrent = false,
}) => {
  const progressRef = useRef<(progress: number) => void>(noop);

  const {onPress, isSyncing} = useDeploymentOnPress({
    deploymentKey,
    onProgress: progress => progressRef.current(progress),
  });

  const titleStyle: TextStyle = {
    color: isCurrent ? '#D93D4A' : 'black',
    textDecorationLine: isCurrent ? 'underline' : 'none',
  };

  return (
    <TouchableOpacity
      disabled={isSyncing}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.deploymentContainer}>
        <Text style={[styles.deploymentName, titleStyle]} numberOfLines={1}>
          {releaseInfo?.label || 'no'}: {name}
        </Text>
        {isSyncing && (
          <>
            <ActivityIndicator color="#D93D4A" size={28} />
            <Progress progressRef={progressRef} />
          </>
        )}
      </View>
      {releaseInfo ? (
        <View style={styles.releaseInfoContainer}>
          {!!releaseInfo.description && (
            <Text style={styles.info}>{releaseInfo.description}</Text>
          )}
          {!!releaseInfo.size && (
            <Text style={styles.info}>
              Size: {formatBytes(releaseInfo.size)}
            </Text>
          )}
          {!!releaseInfo.target_binary_range && (
            <Text style={styles.info}>
              Target version: {releaseInfo.target_binary_range}
            </Text>
          )}
          {!!releaseInfo.upload_time && (
            <Text style={styles.info}>
              Uploaded: {toFormattedDate(releaseInfo.upload_time)}
            </Text>
          )}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
