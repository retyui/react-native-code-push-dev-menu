import React, {FC} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';

const styles = StyleSheet.create({
  topRoot: {
    flexDirection: 'row',
  },
  textInputRoot: {
    flex: 1,
    marginTop: 8,
    marginHorizontal: 16,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    height: 50,
  },
  loader: {
    marginTop: 16,
    alignSelf: 'center',
  },
  errorBox: {
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 17,
    color: '#000',
    marginBottom: 8,
  },
  emptyInfo: {
    fontSize: 17,
    color: '#000',
    marginTop: 20,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
});

interface Props {
  isRunning: boolean;
  hasData: boolean;
  error: Error | null;
  onSearch: (value: string) => void;
  search: string;
  onRefresh: () => void;
}

export const DeploymentsListHeader: FC<Props> = ({
  search,
  hasData,
  isRunning,
  error,
  onSearch,
  onRefresh,
}: Props) => (
  <>
    <View style={styles.topRoot}>
      <View style={styles.textInputRoot}>
        <TextInput
          style={styles.textInput}
          placeholder="Search deployment..."
          value={search}
          onChangeText={onSearch}
        />
      </View>
    </View>

    {!hasData && (
      <>
        {isRunning ? (
          <ActivityIndicator style={styles.loader} size={60} />
        ) : (
          <Text style={styles.emptyInfo}>
            There are no deployments. Pull to refresh
          </Text>
        )}
      </>
    )}

    {error ? (
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>⚠️ We cannot load deployments list</Text>
        <Button title="Retry" onPress={onRefresh} />
      </View>
    ) : null}
  </>
);
