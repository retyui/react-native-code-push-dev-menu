import React, {FC, useCallback} from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';

import {Deployment} from '../types';
import {useCurrentPackage} from '../hooks/useCurrentPackage';
import {useDeployments} from '../hooks/useDeployments';

import {DeploymentItem} from './DeploymentItem';
import {DeploymentsListHeader} from './DeploymentsListHeader';

const styles = StyleSheet.create({
  separator: {height: 8},
  meta: {fontSize: 13},
  metaTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const keyExtractor = (item: Deployment) => item.key || item.name;

const clearUpdatesAndRestart = () => {
  CodePush.clearUpdates();
  CodePush.restartApp();
};

const CodePushDeMenuButton: FC = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const {currentPackage} = useCurrentPackage();
  const {search, onRefresh, isRunning, deployments, onSearch, error} =
    useDeployments();

  const renderItem: ListRenderItem<Deployment> = useCallback(
    ({item: deployment}) => (
      <DeploymentItem
        isCurrent={currentPackage?.deploymentKey === deployment.key}
        deploymentKey={deployment.key}
        releaseInfo={deployment.latest_release}
        name={deployment.name}
      />
    ),
    [currentPackage?.deploymentKey],
  );

  return (
    <>
      <Button
        title="Change Deployment..."
        onPress={() => setIsModalVisible(true)}
      />

      <View style={styles.separator} />

      <Button
        title="Reset installed updates"
        onPress={clearUpdatesAndRestart}
      />

      <View style={styles.separator} />

      <Text style={styles.meta}>
        <Text style={styles.metaTitle}>Installed update:</Text>
        {currentPackage
          ? JSON.stringify(
              {
                ...currentPackage,
                // omit
                packageHash: undefined,
                downloadUrl: undefined,
              },
              null,
              2,
            )
          : 'n/a'}
      </Text>

      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <FlatList<Deployment>
          contentInsetAdjustmentBehavior="always"
          data={deployments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={deployments && isRunning}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponent={
            <>
              <Button title="Exit" onPress={() => setIsModalVisible(false)} />

              <DeploymentsListHeader
                search={search}
                hasData={!!deployments.length}
                onSearch={onSearch}
                error={error}
                isRunning={isRunning}
                onRefresh={onRefresh}
              />
            </>
          }
        />
      </Modal>
    </>
  );
};

export {CodePushDeMenuButton};
