import { useQuery } from '@tanstack/react-query';
import { pick } from 'lodash';

import { getUserLaunchDataQuery } from '../api';
import { setUser } from '../store';
import { LaunchStoreUser } from '../interfaces';

import { USER_QUERY } from '@src/shared/queryKeys';
import { useEffect } from 'react';
import { setSettings, type SettingsStore } from '../../settings';

const useLauncUserData = (user: LaunchStoreUser) => {
  const { data: userLaunchData } = useQuery({
    queryKey: [USER_QUERY, user.uid],
    queryFn: () => getUserLaunchDataQuery(user),
  });

  useEffect(() => {
    const localSettings = localStorage.getItem('settings');

    if (!!localSettings) {
      setSettings(JSON.parse(localSettings) as SettingsStore);
    }

    if (userLaunchData) {
      setUser(pick(userLaunchData, ['lastViewedSpace', 'spaces']));
      //@ts-expect-error
      setSettings(userLaunchData.settings);
    }
  }, [userLaunchData]);
};

export { useLauncUserData };
