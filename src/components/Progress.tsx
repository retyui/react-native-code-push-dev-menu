import React, {MutableRefObject, useEffect, useState, FC} from 'react';
import {Text} from 'react-native';

interface Props {
  progressRef: MutableRefObject<(progress: number) => void>;
}

const style = {minWidth: 30};

export const Progress: FC<Props> = ({progressRef}) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    progressRef.current = setProgress;

    return () => {
      progressRef.current = () => {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (progress === 0) {
    return null;
  }

  return <Text style={style}>{(progress * 100).toFixed(0)}%</Text>;
};
