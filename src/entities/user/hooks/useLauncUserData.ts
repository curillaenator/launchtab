import { useQuery } from '@tanstack/react-query';
import { pick } from 'lodash';

import { getUserLaunchDataQuery } from '../api';
import { setUser } from '../store';
import { LaunchStoreUser } from '../interfaces';

import { USER_QUERY } from '@src/shared/queryKeys';
import { useEffect } from 'react';
import { setSettings } from '../../settings';

const useLauncUserData = (user: LaunchStoreUser) => {
  const { data: userLaunchData, isLoading } = useQuery({
    queryKey: [USER_QUERY, user.uid],
    queryFn: () => getUserLaunchDataQuery(user),
  });

  useEffect(() => {
    if (userLaunchData) {
      setUser(pick(userLaunchData, ['lastViewedSpace', 'spaces']));
      //@ts-expect-error
      setSettings(userLaunchData.settings);
    }
  }, [userLaunchData]);

  return { isLoading };
};

export { useLauncUserData };
