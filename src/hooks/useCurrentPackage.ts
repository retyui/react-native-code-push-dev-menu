import {useEffect, useState} from 'react';
import CodePush, {LocalPackage} from 'react-native-code-push';

export const useCurrentPackage = (): {
  currentPackage: LocalPackage | null;
} => {
  const [currentPackage, setCurrentPackage] = useState<LocalPackage | null>(
    null,
  );

  useEffect(() => {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then(
      setCurrentPackage,
    );
  }, []);

  return {
    currentPackage,
  };
};
